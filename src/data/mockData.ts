export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

export interface Lesson {
    id: string;
    title: string;
    // A lesson can have different types of content blocks
    content: Array<{
        type: 'text' | 'video';
        content: string; // For text, this is the paragraph. For video, this is the YouTube video ID.
    }>;
    quiz?: QuizQuestion[];
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    modules: Module[];
    certificateName?: string;
}

export const mockCourses: Course[] = [
    {
        id: '1',
        title: 'Основы антикоррупционного права',
        description: 'Полный курс, охватывающий все аспекты антикоррупционного законодательства, от базовых определений до сложных случаев и международных практик.',
        modules: [
            {
                id: 'm1',
                title: 'Введение в антикоррупцию',
                lessons: [
                    {
                        id: 'l1-1',
                        title: 'Что такое коррупция?',
                        content: [
                            { type: 'text', content: 'Коррупция — это использование должностным лицом своих властных полномочий и доверенных ему прав, а также связанных с этим официальным статусом авторитета, возможностей, связей в целях личной выгоды, противоречащее законодательству и моральным установкам.' },
                            { type: 'text', content: 'В этом уроке мы рассмотрим ключевые определения и формы коррупции.' },
                            { type: 'video', content: 'dQw4w9WgXcQ' }, // Example Video ID
                        ],
                        quiz: [
                            {
                                id: 'q1-1-1',
                                question: 'Что из перечисленного является формой коррупции?',
                                options: ['Лоббизм', 'Взяточничество', 'Благотворительность', 'Спонсорство'],
                                correctAnswerIndex: 1,
                            },
                            {
                                id: 'q1-1-2',
                                question: 'Какой основной мотив коррупционных действий?',
                                options: ['Альтруизм', 'Личная выгода', 'Общественное благо', 'Долг'],
                                correctAnswerIndex: 1,
                            },
                        ],
                    },
                    {
                        id: 'l1-2',
                        title: 'История борьбы с коррупцией',
                        content: [
                            { type: 'text', content: 'Борьба с коррупцией имеет древние корни, начиная с законов Хаммурапи и до современных международных конвенций.' },
                        ],
                    },
                ],
            },
            {
                id: 'm2',
                title: 'Правовая база',
                lessons: [
                    {
                        id: 'l2-1',
                        title: 'Федеральный закон № 273-ФЗ "О противодействии коррупции"',
                        content: [
                            { type: 'text', content: 'Это основной документ, регулирующий антикоррупционную деятельность в России. Он устанавливает основные принципы противодействия коррупции, правовые и организационные основы предупреждения и борьбы с ней.' },
                        ],
                        quiz: [
                            {
                                id: 'q2-1-1',
                                question: 'Когда был принят ФЗ № 273?',
                                options: ['2008', '2010', '2005', '2012'],
                                correctAnswerIndex: 0,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Продвинутые техники расследования',
        description: 'Научитесь выявлять сложные коррупционные схемы и проводить независимые расследования.',
        modules: [
            {
                id: 'm3',
                title: 'Финансовые расследования',
                lessons: [
                    {
                        id: 'l3-1',
                        title: 'Анализ государственных закупок',
                        content: [
                            { type: 'text', content: 'Изучаем, как находить признаки коррупции в тендерах и закупках.' },
                        ],
                    },
                ],
            },
        ],
    },
];

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'active' | 'blocked';
    avatar?: string;
    registrationDate: string; // ISO 8601 format
}

export const mockUsers: User[] = [
    { id: '1', name: 'Мария Иванова', email: 'maria.ivanova@example.com', role: 'admin', status: 'active', registrationDate: '2023-01-15T09:30:00Z' },
    { id: '2', name: 'Дмитрий Сидоров', email: 'dmitry.sidorov@example.com', role: 'user', status: 'active', registrationDate: '2023-02-20T14:00:00Z' },
    { id: '3', name: 'Елена Козлова', email: 'elena.kozlova@example.com', role: 'user', status: 'active', registrationDate: '2023-03-10T11:45:00Z' },
    { id: '4', name: 'Андрей Петров', email: 'andrey.petrov@example.com', role: 'moderator', status: 'active', registrationDate: '2023-04-05T16:20:00Z' },
    { id: '5', name: 'Ольга Смирнова', email: 'olga.smirnova@example.com', role: 'user', status: 'blocked', registrationDate: '2023-05-21T08:00:00Z' },
    { id: '6', name: 'Игорь Волков', email: 'igor.volkov@example.com', role: 'user', status: 'active', registrationDate: '2023-06-18T18:10:00Z' },
    { id: '7', name: 'Анна Федорова', email: 'anna.fedorova@example.com', role: 'moderator', status: 'active', registrationDate: '2023-07-02T12:00:00Z' },
    { id: '8', name: 'Максим Орлов', email: 'maxim.orlov@example.com', role: 'user', status: 'blocked', registrationDate: '2023-08-11T22:30:00Z' },
    { id: '9', name: 'Татьяна Белова', email: 'tatiana.belova@example.com', role: 'user', status: 'active', registrationDate: '2023-09-25T13:05:00Z' },
    { id: '10', name: 'Сергей Морозов', email: 'sergey.morozov@example.com', role: 'user', status: 'active', registrationDate: '2023-10-30T19:50:00Z' },
]; 