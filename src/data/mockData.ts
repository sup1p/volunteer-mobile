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
    level: number;
    points: number;
    nextLevelPoints: number;
    rank: number;
    completedMissions: number;
    eventsAttended: number;
    joinDate: string;
    totalVolunteers: number;
}

export const mockUsers: User[] = [
    { id: '1', name: 'Мария Иванова', email: 'maria.ivanova@example.com', role: 'admin', status: 'active', registrationDate: '2023-01-15T09:30:00Z', level: 10, points: 3500, nextLevelPoints: 4000, rank: 1, completedMissions: 50, eventsAttended: 15, joinDate: '15 января 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: '2', name: 'Дмитрий Сидоров', email: 'dmitry.sidorov@example.com', role: 'user', status: 'active', registrationDate: '2023-02-20T14:00:00Z', level: 5, points: 1250, nextLevelPoints: 1500, rank: 12, completedMissions: 23, eventsAttended: 8, joinDate: '20 февраля 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: '3', name: 'Елена Козлова', email: 'elena.kozlova@example.com', role: 'user', status: 'active', registrationDate: '2023-03-10T11:45:00Z', level: 4, points: 980, nextLevelPoints: 1000, rank: 25, completedMissions: 18, eventsAttended: 5, joinDate: '10 марта 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: '4', name: 'Андрей Петров', email: 'andrey.petrov@example.com', role: 'moderator', status: 'active', registrationDate: '2023-04-05T16:20:00Z', level: 7, points: 2100, nextLevelPoints: 2500, rank: 5, completedMissions: 35, eventsAttended: 10, joinDate: '5 апреля 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    { id: '5', name: 'Ольга Смирнова', email: 'olga.smirnova@example.com', role: 'user', status: 'blocked', registrationDate: '2023-05-21T08:00:00Z', level: 2, points: 300, nextLevelPoints: 500, rank: 102, completedMissions: 5, eventsAttended: 2, joinDate: '21 мая 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    { id: '6', name: 'Игорь Волков', email: 'igor.volkov@example.com', role: 'user', status: 'active', registrationDate: '2023-06-18T18:10:00Z', level: 3, points: 650, nextLevelPoints: 800, rank: 56, completedMissions: 12, eventsAttended: 4, joinDate: '18 июня 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
    { id: '7', name: 'Анна Федорова', email: 'anna.fedorova@example.com', role: 'moderator', status: 'active', registrationDate: '2023-07-02T12:00:00Z', level: 8, points: 2800, nextLevelPoints: 3000, rank: 3, completedMissions: 40, eventsAttended: 12, joinDate: '2 июля 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g' },
    { id: '8', name: 'Максим Орлов', email: 'maxim.orlov@example.com', role: 'user', status: 'blocked', registrationDate: '2023-08-11T22:30:00Z', level: 1, points: 100, nextLevelPoints: 200, rank: 150, completedMissions: 2, eventsAttended: 1, joinDate: '11 августа 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704h' },
    { id: '9', name: 'Татьяна Белова', email: 'tatiana.belova@example.com', role: 'user', status: 'active', registrationDate: '2023-09-25T13:05:00Z', level: 6, points: 1800, nextLevelPoints: 2000, rank: 8, completedMissions: 30, eventsAttended: 7, joinDate: '25 сентября 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704i' },
    { id: '10', name: 'Сергей Морозов', email: 'sergey.morozov@example.com', role: 'user', status: 'active', registrationDate: '2023-10-30T19:50:00Z', level: 4, points: 900, nextLevelPoints: 1000, rank: 30, completedMissions: 15, eventsAttended: 6, joinDate: '30 октября 2023', totalVolunteers: 1847, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704j' },
];

export interface AppEvent {
    id: string;
    category: 'educational' | 'community' | 'practical' | 'in-app' | 'offline-monitoring';
    title: string;
    description: string;
    reward: {
        type: 'points' | 'badge';
        value: number | string;
    };
    date: string; // ISO 8601 format
    participants: number;
}

export const mockEvents: AppEvent[] = [
    // Образовательные события
    {
        id: 'evt-1',
        category: 'educational',
        title: 'Вебинар по антикоррупционному праву',
        description: 'Онлайн-лекция с ведущим экспертом в области юриспруденции. Разбор реальных кейсов.',
        reward: { type: 'points', value: 30 },
        date: '2025-08-05T18:00:00Z',
        participants: 120,
    },
    {
        id: 'evt-2',
        category: 'educational',
        title: 'Тренинг: как подать жалобу',
        description: 'Практическое занятие по составлению и подаче официальных жалоб на коррупционные действия.',
        reward: { type: 'points', value: 40 },
        date: '2025-08-12T15:00:00Z',
        participants: 45,
    },
    // Общественные активности
    {
        id: 'evt-3',
        category: 'community',
        title: 'День информирования',
        description: 'Присоединяйтесь к раздаче информационных материалов и распространению информации в социальных сетях.',
        reward: { type: 'points', value: 25 },
        date: '2025-08-20T10:00:00Z',
        participants: 200,
    },
    {
        id: 'evt-4',
        category: 'community',
        title: 'Просветительская акция "Чистые руки"',
        description: 'Уличный флешмоб и арт-инсталляция в центре города для привлечения внимания к проблеме коррупции.',
        reward: { type: 'points', value: 50 },
        date: '2025-09-01T12:00:00Z',
        participants: 350,
    },
    // Практические мероприятия
    {
        id: 'evt-5',
        category: 'practical',
        title: 'Симуляция проверки госзакупки',
        description: 'Командная работа с анализом фейковых тендеров на предмет выявления коррупционных рисков.',
        reward: { type: 'points', value: 40 },
        date: '2025-08-15T11:00:00Z',
        participants: 30,
    },
    // Внутриприложенческие события
    {
        id: 'evt-6',
        category: 'in-app',
        title: 'Внутренний челендж недели',
        description: 'Выполните серию из 5 миссий внутри приложения и получите главный приз недели.',
        reward: { type: 'points', value: 100 },
        date: '2025-08-02T00:00:00Z',
        participants: 580,
    },
    {
        id: 'evt-7',
        category: 'in-app',
        title: 'Обновление: новые курсы',
        description: 'В приложение добавлены новые курсы по международному праву. Изучите и получите награду!',
        reward: { type: 'badge', value: 'Первооткрыватель' },
        date: '2025-08-01T10:00:00Z',
        participants: 0,
    },
    // Офлайн-контроль и мониторинг
    {
        id: 'evt-8',
        category: 'offline-monitoring',
        title: 'Мониторинг объявлений о тендерах',
        description: 'Примите участие в поиске и анализе подозрительных закупок на официальных порталах.',
        reward: { type: 'points', value: 60 },
        date: '2025-08-25T09:00:00Z',
        participants: 75,
    },
];

export interface UserEventRegistration {
    registrationId: string;
    userId: string;
    eventId: string;
    status: 'registered' | 'attended';
}

export const mockUserRegistrations: UserEventRegistration[] = [
    { registrationId: 'reg-1', userId: '2', eventId: 'evt-1', status: 'registered' },
    { registrationId: 'reg-2', userId: '2', eventId: 'evt-3', status: 'attended' },
    { registrationId: 'reg-3', userId: '3', eventId: 'evt-1', status: 'registered' },
]; 