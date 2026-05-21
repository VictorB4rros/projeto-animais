import './styles.css';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import { useEffect, useState } from 'react';
import DialogInfo from '../../../components/DialogInfo';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';
import type { AnimalDTO } from '../../../models/animal';
import * as animalService from '../../../services/animal-service';

export default function Listing() {

    const navigate = useNavigate();

    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: 'Operação com sucesso!'
    });

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: '',
        message: 'Tem certeza?'
    });

    const [animals, setAnimals] = useState<AnimalDTO[]>([]);

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        animalService.findAll()
            .then(response => {
                const incomingAnimals = response.data || [];
                setAnimals(incomingAnimals);
            });
    }, [refreshKey]);

    function handleNewAnimalClick() {
        navigate("/animais/create");
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleDeleteClick(animalId: string) {
        setDialogConfirmationData({ ...dialogConfirmationData, id: animalId, visible: true });
    }

    function handleUpdateClick(animalId: string) {
        navigate(`/animais/${animalId}`)
    }

    function handleDialogConfirmationAnswerClose(answer: boolean, animalId: string) {
        if (answer) {
            animalService.deleteById(animalId)
                .then(() => {
                    setAnimals([]);
                    setRefreshKey(prev => prev + 1);
                })
                .catch(error => {
                    setDialogInfoData({
                        visible: true,
                        message: error.response.data.error
                    })
                });
        }

        setDialogConfirmationData({ ...dialogConfirmationData, visible: false });
    }

    return (
        <main>
            <section id="animal-listing-section" className="container">
                <h2 className="section-title mb20">Cadastro de animais</h2>

                <div className="btn-page-container mb20">
                    <div onClick={handleNewAnimalClick}>
                        <ButtonInverse text='Novo' />
                    </div>
                    
                </div>

                <table className="table mb20 mt20">
                    <thead>
                        <tr>
                            <th className="txt-left">Nome</th>
                            <th className="txt-left">Espécie</th>
                            <th className="txt-left">Raça</th>
                            <th className="txt-left">Idade</th>
                            <th className="txt-left">Porte</th>
                            <th className="txt-left">Sexo</th>
                            <th className="txt-left">Pelagem</th>
                            <th className="txt-left">Vacinado</th>
                            <th className="txt-left">Vermifugado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            animals.map(animal => (
                                <tr key={animal.id}>
                                    <td className="txt-left">{animal.nome}</td>
                                    <td className="txt-left">{animal.especie}</td>
                                    <td className="txt-left">{animal.raca}</td>
                                    <td className="txt-left">{animal.idade}</td>
                                    <td className="txt-left">{animal.porte}</td>
                                    <td className="txt-left">{animal.sexo}</td>
                                    <td className="txt-left">{animal.pelagem}</td>
                                    <td className="txt-left">{animal.vacinado}</td>
                                    <td className="txt-left">{animal.vermifugado}</td>
                                    <td><img onClick={() => handleUpdateClick(animal.id)} className="animal-listing-btn" src={editIcon} alt="Editar" /></td>
                                    <td><img onClick={() => handleDeleteClick(animal.id)} className="animal-listing-btn" src={deleteIcon} alt="Deletar" /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </section>

            {
                dialogInfoData.visible &&
                <DialogInfo
                    message={dialogInfoData.message}
                    onDialogClose={handleDialogInfoClose}
                />
            }

            {
                dialogConfirmationData.visible &&
                <DialogConfirmation
                    id={dialogConfirmationData.id}
                    message={dialogConfirmationData.message}
                    onDialogAnswer={handleDialogConfirmationAnswerClose}
                />
            }

        </main>
    );
}