import './styles.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/forms';
import * as animalService from '../../../services/animal-service';

export default function Form() {

    const params = useParams();

    const navigate = useNavigate();

    const isEditing = params.animalId !== 'create';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formData, setFormData] = useState<any>({
        nome: {
            value: "",
            id: "nome",
            name: "nome",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{1,80}$/.test(value);
            },
            message: "Favor informar um nome de 1 a 80 caracteres"
        },
        especie: {
            value: "",
            id: "especie",
            name: "especie",
            type: "text",
            placeholder: "Espécie",
            validation: function (value: string) {
                return /^.{1,}$/.test(value);
            },
            message: "Campo espécie não pode ser vazio"
        },
        raca: {
            value: "",
            id: "raca",
            name: "raca",
            type: "text",
            placeholder: "Raça"
        },
        idade: {
            value: "",
            id: "idade",
            name: "idade",
            type: "number",
            placeholder: "Idade",
            validation: function (value: any) {
                return Number(value) > 0;
            },
            message: "Favor informar um valor positivo"
        },
        porte: {
            value: "",
            id: "porte",
            name: "porte",
            type: "text",
            placeholder: "Porte",
            validation: function (value: string) {
                return /^.{1,}$/.test(value);
            },
            message: "Campo porte não pode ser vazio"
        },
        sexo: {
            value: "",
            id: "sexo",
            name: "sexo",
            type: "text",
            placeholder: "Sexo",
            validation: function (value: string) {
                return /^.{1,}$/.test(value);
            },
            message: "Campo sexo não pode ser vazio"
        },
        pelagem: {
            value: "",
            id: "pelagem",
            name: "pelagem",
            type: "text",
            placeholder: "Pelagem"
        },
        vacinado: {
            value: "",
            id: "vacinado",
            name: "vacinado",
            type: "text",
            placeholder: "Vacinado",
            validation: function (value: string) {
                return /^.{1,}$/.test(value);
            },
            message: "Campo vacinado não pode ser vazio"
        },
        vermifugado: {
            value: "",
            id: "vermifugado",
            name: "vermifugado",
            type: "text",
            placeholder: "Vermifugado",
            validation: function (value: string) {
                return /^.{1,}$/.test(value);
            },
            message: "Campo vermifugado não pode ser vazio"
        }
    });

    useEffect(() => {
        if (isEditing) {
            animalService.findById(params.animalId)
                .then(response => {
                    const newFormData = forms.updateAll(formData, response.data);
                    setFormData(newFormData);
                })
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleInputChange(event: any) {
        const result = forms.updateAndValidate(formData, event.target.name, event.target.value);
        setFormData(result);
    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleSubmit(event: any) {
        event.preventDefault();
        const formDataValidated = forms.dirtyAndValidateAll(formData);

        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }

        const requestBody = forms.toValues(formData);
        if (isEditing) {
            requestBody.id = params.animalId;
        }

        const request = isEditing
            ? animalService.updateRequest(requestBody)
            : animalService.insertRequest(requestBody);

        request
            .then(() => {
                navigate("/");
            });
    }

    return (
        <main>
            <section id="animal-form-section" className="container">
                <div className="animal-form-container">
                    <form className="card form" onSubmit={handleSubmit}>
                        <h2>Dados do animal</h2>
                        <div className="form-controls-container">
                            <div>
                                <FormInput
                                    {...formData.nome}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.nome.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.especie}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.especie.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.raca}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.idade}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.idade.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.porte}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.porte.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.sexo}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.sexo.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.pelagem}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput
                                    {...formData.vacinado}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.vacinado.message}</div>
                            </div>
                            <div>
                                <FormInput
                                    {...formData.vermifugado}
                                    className="form-control"
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className="form-error" >{formData.vermifugado.message}</div>
                            </div>
                        </div>

                        <div className="animal-form-buttons">
                            <Link to="/">
                                <button type="reset" className="btn btn-white">Cancelar</button>
                            </Link>
                            <button type="submit" className="btn btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}