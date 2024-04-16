import React, {useContext} from 'react'
import { Input, TextInput } from '../Input'
import { Form, Formik } from 'formik'
import { RegisterExerciseSchema, initialValues } from '@/formik/RegisterExerciseSchema'
import { Button } from '../Button'
import { db } from '../../service/firebaseConnection'
import { AuthContext } from '@/contexts/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

interface INewExercise{
    exercise: string,
    position: string | null,
    series: string,
    observation: string | null,
    repetition: string,
    descanso: string,
    carga: [] | null,
}

export default function Modal({idtraining}: any) {
const [showModal, setShowModal] = React.useState(false);
const { user } = useContext(AuthContext)

const submitForm = async(values: INewExercise) => {
    // Enviar dados do treino
    const { carga, descanso, exercise, observation, position, repetition, series } = values

    if(descanso === '' || exercise === '' || repetition === '' || series === ''){
        alert("Preencha tudo corretamente")
    } else {
        await addDoc(collection(db, "exercises"), {
            id_user:user?.uid,
            id_training: idtraining,
            exercise: exercise,
            position: position,
            series: series,
            observation: observation,
            repetition: repetition,
            descanso: descanso,
            carga: [],
        }).then(() => {
            alert("Treino adicionado com sucesso!")
        }).catch((err) => {
            alert(err.message)
        })
    }
    
}

return (
<div className='w-full'>
    <Button
    bg='bg-black'
    color='text-yellow-400'
    type="button"
    onClick={() => setShowModal(true)}
    >ADICIONAR UM NOVO EXERCICIO</Button>

    {showModal ? (
    <>
        <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                    Cadastrar Exercícios
                </h3>
                <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
                >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">x</span>
                </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
                



        <Formik
        initialValues={initialValues}
        validationSchema={RegisterExerciseSchema}
        onSubmit={(values) => {
            submitForm(values as any);
            console.log('test')
            setShowModal(false)

        }}>
        {(formik) => {
            const { values, touched, handleChange } = formik;

            const errors = {
                objective: "",
                members: "",
                dateini: "",
                datefim: "",
                exercise: "",
                position: "",
                series: "",
                repetition: "",
                descanso: "",
                observation: ""
            };

            const errorExercise = errors.exercise && touched.exercise;
            const errorPosition = errors.position && touched.position;
            const errorSeries = errors.series && touched.series;
            const errorRepetition = errors.repetition && touched.repetition;
            const errorDescanso = errors.descanso && touched.descanso;
            const errorObservation = errors.observation && touched.observation;

            return (
                <Form className='grid grid-cols-3 gap-5'>
                    <div className='col-span-2'>
                        <Input 
                            placeholder='Exercício'
                            name='exercise'
                            onChange={handleChange}
                            value={values.exercise}
                            error={errorExercise && errors.exercise}
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder='Posição'
                            name='position'
                            onChange={handleChange}
                            value={values.position}
                            error={errorPosition && errors.position}
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder='Séries' 
                            type='number'
                            name='series'
                            onChange={handleChange}
                            value={values.series}
                            error={errorSeries && errors.series}
                        />
                    </div>
                    <div>
                        <Input 
                            placeholder='Repetições' 
                            type='number'
                            name='repetition'
                            onChange={handleChange}
                            value={values.repetition}
                            error={errorRepetition && errors.repetition}
                        />
                    </div>
                    <div>
                        <Input 
                            type='text' 
                            styles='before:content-["Descanso:"] before:mr-4 before:text-gray-600'
                            name='descanso'
                            placeholder='Descanso'
                            onChange={handleChange}
                            value={values.descanso}
                            error={errorDescanso && errors.descanso}
                        />
                    </div>
                    <div className='col-span-full'>
                        <TextInput
                            placeholder='Observação'
                            name='observation'
                            onChange={handleChange}
                            value={values.observation}
                            error={errorObservation && errors.observation}
                        />
                    </div>
                    <div className="col-span-full flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        Voltar
                        </button>
                        <button
                        className="bg-yellow-400 text-black uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        >
                        Adicionar Exercício
                        </button>
                    </div>
                </Form>
            );
        }}
        </Formik>
            </div>
            {/*footer*/}

            </div>
        </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
    ) : null}
</div>
);
}