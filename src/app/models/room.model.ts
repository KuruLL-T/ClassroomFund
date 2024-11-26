export interface ShortDto {
    id: string; // Используем string для Guid
    name: string;
}

export interface TypeClassRoomShortDto extends ShortDto {} // Тип аудитории

export interface PurposeClassRoomShortDto extends ShortDto {} // Назначение аудитории

export interface ClassRoomOwnerShortDto extends ShortDto {} // Владелец 

export interface ClassRoomStatusShortDto extends ShortDto {} // Статус использования

export interface AdditionalSectionShortDto {    
    
    /*Учебные Характеристики */ 
    capacity: number; // Вместимость аудитории
    computerCount: number; // Количество компьютеров
    specialEquipmentCount: number; // Количество специального оборудования
    hasWiFi: boolean; // Наличие Wi-Fi
    hasProjector: boolean; // Наличие проектора
    hasWiredNetwork: boolean; // Наличие сети
    hasScreen: boolean; // Наличие экрана
    hasBoard: boolean; // Наличие доски
    portableEquipment: string; // Переносное оборудование
    
    /* Инженерные характеристики */
    area: number; // Площадь аудитории в квадратных метрах
    lastRenovationDate: Date; // Дата последнего ремонта
    hasFoto: boolean; // Наличие плана / фото аудитории
}

export interface ClassRoomTreeDto {
    /* Основные характеристики */
    classRoomId: string; // Используем string для Guid
    number: string; // Номер аудитории
    name: string; // Название аудитории
    type: TypeClassRoomShortDto; // Тип аудитории
    purpose: PurposeClassRoomShortDto[]; // Назначение аудитории
    owner: ClassRoomOwnerShortDto; // Владелец
    status: ClassRoomStatusShortDto; // Статус использования
    additionalSections: AdditionalSectionShortDto[]; // Доп. поля
}

export interface ClassRoomTreeResponseDto {
    buildingId: string; // Используем string для Guid
    buildingName: string; // Название здания
    classRooms: ClassRoomTreeDto[]; // Список аудиторий
}


/* Данные для аудиторий */
export const ROOMS: ClassRoomTreeResponseDto[] = [
    {
        buildingId: "c66f1ab8-cdc6-40ff-97b6-a40b9d570d37",
        buildingName: "корпус 1",
        classRooms: [
            {
                classRoomId: "c2f77ed0-d658-4d3b-b4ce-0bdb412769da",
                number: "105",
                name: "105 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" },
                ],
                owner: { id: "ba14c220-34bc-4966-8b18-f2a52b346517", name: "Петров" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    {
                        capacity: 30,
                        computerCount: 15,
                        specialEquipmentCount: 5,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "ноутбук, проектор",
                        area: 50,
                        lastRenovationDate: new Date("2022-01-15"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "59b0154e-6184-4507-afb9-da628b3a02a7",
                number: "106",
                name: "106 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" },
                ],
                owner: { id: "ba14c220-34bc-4966-8b18-f2a52b346517", name: "Петров" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    {
                        capacity: 25,
                        computerCount: 10,
                        specialEquipmentCount: 3,
                        hasWiFi: true,
                        hasProjector: false,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "доска, маркеры",
                        area: 45,
                        lastRenovationDate: new Date("2021-05-20"),
                        hasFoto: false
                    }
                ],
            },
            {
                classRoomId: "79a380ac-5b79-46e1-82f9-36ebb1742c07",
                number: "210",
                name: "столовая",
                type: { id: "d630119c-1cc9-4784-96b2-2ac7b076bd1a", name: "служебная" },
                purpose: [
                    { id: "e52acf7d-84ce-440f-804b-4555c3ffccf1", name: "общепит" }
                ],
                owner: { id: "7a109a88-1628-423e-abed-565533fb625c", name: "Сидоров" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    { 
                        capacity: 100,
                        computerCount: 0,
                        specialEquipmentCount: 0,
                        hasWiFi: false,
                        hasProjector: false,
                        hasWiredNetwork: false,
                        hasScreen: false,
                        hasBoard: false,
                        portableEquipment: "столы, стулья",
                        area: 150,
                        lastRenovationDate: new Date("2020-11-10"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
                number: "201",
                name: "201 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" }
                ],
                owner: { id: "3879b09f-b0a8-45a6-84a5-a2c00c926ffa", name: "Васильков" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    { 
                        capacity: 40,
                        computerCount: 20,
                        specialEquipmentCount: 10,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "ноутбук, проектор, доска",
                        area: 60,
                        lastRenovationDate: new Date("2023-03-01"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
                number: "202",
                name: "202 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "b804121e-b7d9-46b5-8d01-63d5eebf6d69", name: "для занятий спортом" }
                ],
                owner: { id: "3879b09f-b0a8-45a6-84a5-a2c00c926ffa", name: "Васильков" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    { 
                        capacity: 35,
                        computerCount: 5,
                        specialEquipmentCount: 2,
                        hasWiFi: true,
                        hasProjector: false,
                        hasWiredNetwork: true,
                        hasScreen: false,
                        hasBoard: true,
                        portableEquipment: "доска, маркеры",
                        area: 55,
                        lastRenovationDate: new Date("2022-09-15"),
                        hasFoto: false
                    }
                ],
            },
            {
                classRoomId: "c3d4e5f6-a7b8-9012-cdef-34567890123",
                number: "203",
                name: "203 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" }
                ],
                owner: { id: "3879b09f-b0a8-45a6-84a5-a2c00c926ffa", name: "Васильков" },
                status: { id: "ef2dbe00-fb46-4231-be11-5c7660eeeac7", name: "свободна" },
                additionalSections: [
                    {
                        capacity: 50,
                        computerCount: 25,
                        specialEquipmentCount: 8,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "ноутбук, проектор, доска",
                        area: 70,
                        lastRenovationDate: new Date("2023-01-10"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "d4e5f6a7-b8c9-0123-def4-56789012345",
                number: "204",
                name: "204 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "b804121e-b7d9-46b5-8d01-63d5eebf6d69", name: "для занятий спортом" }
                ],
                owner: { id: "3879b09f-b0a8-45a6-84a5-a2c00c926ffa", name: "Васильков" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    { 
                        capacity: 45,
                        computerCount: 12,
                        specialEquipmentCount: 4,
                        hasWiFi: true,
                        hasProjector: false,
                        hasWiredNetwork: true,
                        hasScreen: false,
                        hasBoard: true,
                        portableEquipment: "доска, маркеры",
                        area: 65,
                        lastRenovationDate: new Date("2024-05-10"),
                        hasFoto: false
                    }
                ],
            }
        ]
    },
    {
        buildingId: "ec31c453-e7cc-4be2-aeeb-804840572bb6",
        buildingName: "корпус 2",
        classRooms: [
            {
                classRoomId: "e3f6f89b-5a56-4d89-8f3c-1c4a12c34e37",
                number: "104",
                name: "104 кабинет",
                type: { id: "72a570ef-6ee1-40ae-b1db-81c43263ff7e", name: "лаборатория" },
                purpose: [
                    { id: "8288dada-8f7a-42fc-88e7-e34d6c90b963", name: "практические занятия" }
                ],
                owner: { id: "6e4ae56b-22dd-4e8b-8988-69298aa705d7", name: "Иванов" },
                status: { id: "ef2dbe00-fb46-4231-be11-5c7660eeeac7", name: "свободна" },
                additionalSections: [
                    {                  
                        capacity: 20,
                        computerCount: 5,
                        specialEquipmentCount: 3,
                        hasWiFi: true,
                        hasProjector: false,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "Микроскоп",
                        area: 45,
                        lastRenovationDate: new Date("2023-02-10"),
                        hasFoto: true
                    },
                ],
            },
            {
                classRoomId: "f5b1e60c-71c7-440c-85b2-bea759d56d48",
                number: "206",
                name: "206 кабинет",
                type: { id: "569ea081-aa4c-4784-b27f-8968b03ccc79", name: "актовый зал" },
                purpose: [
                    { id: "dbc531fd-57f7-45fa-98b8-96d624226ba0", name: "для мероприятий" }
                ],
                owner: { id: "ae961ce6-6073-4f4d-9887-0a2a42aa1f98", name: "Федуков" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    {                
                        capacity: 50,
                        computerCount: 10,
                        specialEquipmentCount: 4,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: false,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "портативный проектор",
                        area: 85,
                        lastRenovationDate: new Date("2021-08-15"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "d1e71dc9-e8b2-4b57-a1da-65e054eed123",
                number: "110",
                name: "110 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" }
                ],
                owner: { id: "6e4ae56b-22dd-4e8b-8988-69298aa705d7", name: "Иванов" },
                status: { id: "ef2dbe00-fb46-4231-be11-5c7660eeeac7", name: "свободна" },
                additionalSections: [
                    {                 
                        capacity: 15,
                        computerCount: 2,
                        specialEquipmentCount: 6,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: false,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "нет",
                        area: 40,
                        lastRenovationDate: new Date("2023-03-25"),
                        hasFoto: true 
                    }
                ],
            }
        ]
    },
    {
        buildingId: "b1c1b0d4-e2a5-4f4c-8b7b-ea2bbcedb8df",
        buildingName: "копрус 3",
        classRooms: [
            {
                classRoomId: "b2c30e91-c1a1-4d1a-bb7d-9ad80023c3b0",
                number: "101",
                name: "101 кабинет",
                type: { id: "dd565fd4-7852-44fd-8ea9-8049f7482d71", name: "учебная" },
                purpose: [
                    { id: "00000000-0000-0000-0000-000000000000", name: "для лекций" }
                ],
                owner: { id: "f4b790bf-abcb-4a64-a76c-0c84ed63116e", name: "Чихачев" }, 
                status: { id: "ef2dbe00-fb46-4231-be11-5c7660eeeac7", name: "свободна" },
                additionalSections: [
                    {
                        capacity: 30,
                        computerCount: 10,
                        specialEquipmentCount: 1,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: true,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "мультимедийная система",
                        area: 50,
                        lastRenovationDate: new Date("2022-05-01"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "c1d3f401-d2a2-4a25-afa5-d07f09b4a500",
                number: "202",
                name: "202 кабинет",
                type: { id: "6100c073-ec0e-4875-8b33-02eee23b0d3b", name: "компьютерный класс" },
                purpose: [
                    { id: "8288dada-8f7a-42fc-88e7-e34d6c90b963", name: "практические занятия" }
                ],
                owner: { id: "f4b790bf-abcb-4a64-a76c-0c84ed63116e", name: "Чихачев" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    {                  
                        capacity: 40,
                        computerCount: 40,
                        specialEquipmentCount: 0,
                        hasWiFi: true,
                        hasProjector: false,
                        hasWiredNetwork: true,
                        hasScreen: false,
                        hasBoard: true,
                        portableEquipment: "Ноутбук для лекций",
                        area: 70,
                        lastRenovationDate: new Date("2023-01-15"),
                        hasFoto: true
                    }
                ],
            },
            {
                classRoomId: "d9f3b9fb-35e3-4da9-8445-61c943b8bcde",
                number: "303",
                name: "столовая",
                type: { id: "d630119c-1cc9-4784-96b2-2ac7b076bd1a", name: "служебная" },
                purpose: [
                    { id: "e52acf7d-84ce-440f-804b-4555c3ffccf1", name: "общепит" }
                ],
                owner: { id: "628b3cd1-269c-4d85-a751-0248975cfb09", name: "Смирнова" },
                status: { id: "e91c93f0-5e08-4f79-92f4-37853bcbc4bb", name: "используется" },
                additionalSections: [
                    {                  
                        capacity: 100,
                        computerCount: 5,
                        specialEquipmentCount: 2,
                        hasWiFi: true,
                        hasProjector: true,
                        hasWiredNetwork: false,
                        hasScreen: true,
                        hasBoard: true,
                        portableEquipment: "нет",
                        area: 120,
                        lastRenovationDate: new Date("2021-11-20"),
                        hasFoto: true
                    }
                ],
            }
        ]
    }      
];