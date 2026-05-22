import './styles.css';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import { useEffect, useState } from 'react';
import DialogConfirmation from '../../../components/DialogConfirmation';
import ButtonInverse from '../../../components/ButtonInverse';
import { useNavigate } from 'react-router-dom';
import type { AnimalDTO } from '../../../models/animal';
import * as animalService from '../../../services/animal-service';

export default function Listing() {

    const navigate = useNavigate();

    const [dialogConfirmationData, setDialogConfirmationData] = useState({
        visible: false,
        id: '',
        message: 'Tem certeza de que deseja excluir esse bichinho?'
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
                            <th className="txt-center">Nome</th>
                            <th className="txt-center">Espécie</th>
                            <th className="txt-center">Raça</th>
                            <th className="txt-center">Idade</th>
                            <th className="txt-center">Porte</th>
                            <th className="txt-center">Sexo</th>
                            <th className="txt-center">Pelagem</th>
                            <th className="txt-center">Vacinado</th>
                            <th className="txt-center">Vermifugado</th>
                            <th className="txt-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            animals.map(animal => (
                                <tr key={animal.id}>
                                    <td className="txt-center">{animal.nome}</td>
                                    <td className="txt-center">{animal.especie}</td>
                                    <td className="txt-center">{animal.raca}</td>
                                    <td className="txt-center">{animal.idade}</td>
                                    <td className="txt-center">{animal.porte}</td>
                                    <td className="txt-center">{animal.sexo}</td>
                                    <td className="txt-center">{animal.pelagem}</td>
                                    <td className="txt-center">{animal.vacinado}</td>
                                    <td className="txt-center">{animal.vermifugado}</td>
                                    <td>
                                        <img onClick={() => handleUpdateClick(animal.id)} className="animal-listing-btn" src={editIcon} alt="Editar" />
                                        <img onClick={() => handleDeleteClick(animal.id)} className="animal-listing-btn" src={deleteIcon} alt="Deletar" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </section>

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