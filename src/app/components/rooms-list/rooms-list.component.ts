import { Component} from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClassRoomTreeResponseDto, ROOMS } from "../../models/room.model";
import { FormsModule } from "@angular/forms";
import { GridModule, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_TREELIST, ExcelModule, TreeListModule } from '@progress/kendo-angular-treelist';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { KENDO_LABEL } from '@progress/kendo-angular-label';
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_LAYOUT } from "@progress/kendo-angular-layout";
import { KENDO_DATEINPUTS } from '@progress/kendo-angular-dateinputs';
import { KENDO_TREEVIEW, TreeViewModule, CheckableSettings } from '@progress/kendo-angular-treeview';
import { SVGIcon, gearIcon, xIcon, fileExcelIcon } from "@progress/kendo-svg-icons";
import { KENDO_DIALOGS } from '@progress/kendo-angular-dialog';

interface ColumnsVisibility { // Для настройки столбцов
  [key: string]: boolean;  
}

@Component({
    selector: 'app-rooms-list',
    standalone: true,
    templateUrl: './rooms-list.component.html',
    styleUrls: ['./rooms-list.component.scss'],
    imports: [RouterModule, FormsModule, GridModule, TreeListModule, TreeViewModule, ExcelModule,
      KENDO_GRID, KENDO_TREELIST, KENDO_DROPDOWNS, KENDO_LABEL, 
      KENDO_INPUTS, KENDO_BUTTONS, KENDO_LAYOUT, KENDO_DATEINPUTS, 
      KENDO_TREEVIEW, KENDO_DIALOGS],
})

export class RoomsListComponent {

  public rooms: any[] = []; // Массив для хранения всех аудиторий
  public filteredRooms: any[] = []; // Массив для хранения отфильтрованных аудиторий
  
  public fileExcelIcon: SVGIcon = fileExcelIcon;
  
  /* Реализация показа и експорта стоблца индекса с правильными данным */
  public displayedRooms: any[] = [];
  updateDisplayedRooms() {
    this.displayedRooms = this.filteredRooms.map((room, index) => ({
      ...room,
      index: index + 1 // Добавляем индекс в объект
    }));
  }

  /* Реализация настройки столбцов */
  public opened = false;
  public close(): void {
    this.opened = false;
  }
  public open(): void {
    this.opened = true;
  }
  public gearSVG: SVGIcon = gearIcon;
  public xSVG: SVGIcon = xIcon;
  columns = [
    { field: 'buildingName', title: 'Корпус' },
    { field: 'type', title: 'Тип аудитории' },
    { field: 'number', title: 'Номер' },
    { field: 'name', title: 'Название' },
    { field: 'purpose', title: 'Назначение' },
    { field: 'capacity', title: 'Вместимость' },

    { field: 'owner', title: 'Владелец' },
    { field: 'status', title: 'Статус' },
    { field: 'computerCount', title: 'Кол-во компьютеров' },
    { field: 'hasWiFi', title: 'Wi-Fi' },
    { field: 'hasProjector', title: 'Прожектор' },
    { field: 'hasScreen', title: 'Экран' },
    { field: 'hasBoard', title: 'Доска' }
  ];
  columnsVisibility: ColumnsVisibility = {
    buildingName: true,
    type: true,
    number: true,
    name: true,
    purpose: true,
    capacity: true,

    owner: false,
    status: false,
    computerCount: false,
    hasWiFi: false,
    hasProjector: false,
    hasScreen: false,
    hasBoard: false,
  };
  tempColumnVisibility: ColumnsVisibility;
  constructor() { 
    this.tempColumnVisibility = { ...this.columnsVisibility }; // Инициализируем временные настройки видимости столбцов
    this.checkedKeys = this.getAllClassRoomIds(ROOMS);
  }
  resetColumnSettings() { // Возвращаем временный объект к изначальным значениям
    this.tempColumnVisibility = {
      buildingName: true,
      type: true,
      number: true,
      name: true,
      purpose: true,
      capacity: true,
  
      owner: false,
      status: false,
      computerCount: false,
      hasWiFi: false,
      hasProjector: false,
      hasScreen: false,
      hasBoard: false,
    };
    this.columnsVisibility = { ...this.tempColumnVisibility };
    this.saveColumnVisibility(); // Сохраняем видимость в localStorage
  }
  toggleColumnVisibility(columnName: string) {   
    this.tempColumnVisibility[columnName] = !this.tempColumnVisibility[columnName];
    this.saveColumnVisibility(); // Сохраняем новое состояние
  }
  saveColumnVisibility() {
    localStorage.setItem('columnsVisibility', JSON.stringify(this.tempColumnVisibility));
  } 
  applyColumnSettings() {
    this.columnsVisibility = { ...this.tempColumnVisibility }; // Копирует изменения в основной объект
    this.saveColumnVisibility(); // Сохраняем видимость в localStorage
  }

  /* Реализация дерева аудиторий */

  public enableCheck = true;
  public checkChildren = true;
  public checkDisabledChildren = true;
  public checkParents = true;
  public checkOnClick = true;
  public uncheckCollapsedChildren = true;

  public get checkableSettings(): CheckableSettings {
    return {
      checkChildren: this.checkChildren,
      checkDisabledChildren: this.checkDisabledChildren,
      checkParents: this.checkParents,
      enabled: this.enableCheck,
      checkOnClick: this.checkOnClick,
      uncheckCollapsedChildren: this.uncheckCollapsedChildren,
    };
  }

  /* Список всех корпусов и аудиторий, для изначального выбора в treeview */
  getAllClassRoomIds(rooms: ClassRoomTreeResponseDto[]): string[] {
    return rooms.flatMap(building => [
      ...building.classRooms.map(room => room.classRoomId),
      building.buildingName
  ]);
  }

  public checkedKeys: any[] = [];
 
  // public checkedKeys: any[] = [
  //   "c2f77ed0-d658-4d3b-b4ce-0bdb412769da",
  //   "59b0154e-6184-4507-afb9-da628b3a02a7",
  //   "79a380ac-5b79-46e1-82f9-36ebb1742c07",
  //   "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  //   "b2c3d4e5-f6a7-8901-bcde-f23456789012",
  //   "c3d4e5f6-a7b8-9012-cdef-34567890123",
  // ];
  
  public expandedKeys: any[] = ["0"];
  public key = "text";

  public data: any[] = ROOMS.map(room => {
    return {
      text: room.buildingName,  
        items: room.classRooms.map(classRoom => {
          return {
            text: classRoom.classRoomId,
            roomNumber: classRoom.number       
          };
        })
    };
  });

  public listBuildings: Array<string> = ["Все"];
  public listTypes: Array<string> = ["Все"];
  public listPurposes: Array<string> = ["Все"];

  public applySelectRooms(){
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSelectBuilding = this.listBuildings.includes("Все") || this.listBuildings.includes(room.buildingName);
      const matchesSelectType = this.listTypes.includes("Все") || this.listTypes.includes(room.type);
      const matchesSelectPurpose = this.listPurposes.includes("Все") || this.listPurposes.includes(room.purpose);

      return matchesSelectBuilding &&  matchesSelectType && matchesSelectPurpose;
    });
    this.syncBuildingFilter();
    this.syncTypeFilter();
    this.syncPurposeFilter();
    this.updateDisplayedRooms();
  }

  /* Реализация данных для фильтра */
  public buildingFilter: string = 'Все';
  public typeFilter: string = 'Все';
  public purposeFilter: string = 'Все';
  public statusFilter: string = 'Все';
  public numberFilter: string = '';
  public ownerFilter: string = '';

  public capacityFilterFrom: number = 0;
  public capacityFilterTo: number = 100;
  public computerCountFilterFrom: number = 0;
  public computerCountFilterTo: number = 100;
  public hasWiFiFilter: string = 'Все';
  
  public areaFilterFrom: number = 30;
  public areaFilterTo: number = 200;
  public lastRenovationDateStart: Date = new Date("2000-01-01");
  public lastRenovationDateEnd: Date = new Date("2100-01-01");
  public hasFotoFilter: string = 'Все';

  // Перебор для select 
  buildings: string[] = [];
  types: string[] = [];
  purposes: string[] = [];
  statuses: string[] = [];
  hasWiFi: string[] = ['Есть', 'Нет'];
  hasFoto: string[] = ['Есть', 'Нет'];
  addAllOption() { // Добавляет "Все" - в начало для каждого select
    this.buildings.unshift("Все");
    this.types.unshift("Все");
    this.purposes.unshift("Все");
    this.statuses.unshift("Все");
    this.hasWiFi.unshift("Все");
    this.hasFoto.unshift("Все");
  }
  initializeFilters() {  // Инициализация уникальных значений для фильтров
    this.buildings = [...new Set(ROOMS.map(room => room.buildingName))];
    this.types = [...new Set(ROOMS.flatMap(room => room.classRooms.map(classRoom => classRoom.type.name)))];
    this.purposes = [...new Set(ROOMS.flatMap(room => room.classRooms.flatMap(classRoom => classRoom.purpose.map(p => p.name))))];
    this.statuses = [...new Set(ROOMS.flatMap(room => room.classRooms.map(classRoom => classRoom.status.name)))];
  }
  ngOnInit() {
    
    this.initializeFilters();
    
    this.loadRooms();
    // Загрузка данных localStorage для настройки столбцов
    const savedVisibility = localStorage.getItem('columnsVisibility');
    if (savedVisibility) {
        this.tempColumnVisibility = JSON.parse(savedVisibility);
        this.applyColumnSettings(); // Применяем сохранённые изменения
    } else {
        this.tempColumnVisibility = { ...this.columnsVisibility }; // Инициализация по умолчанию, если нет данных
    }
    this.addAllOption();
    this.updateDisplayedRooms();

    // Загрузка данных localStorage для фильтров
    const savedFilters = localStorage.getItem('roomFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      this.buildingFilter = filters.buildingFilter;
      this.typeFilter = filters.typeFilter;
      this.purposeFilter = filters.purposeFilter;
      this.statusFilter = filters.statusFilter;
      this.numberFilter = filters.numberFilter;
      this.ownerFilter = filters.ownerFilter;
      this.capacityFilterFrom = filters.capacityFilterFrom;
      this.capacityFilterTo = filters.capacityFilterTo;
      this.computerCountFilterFrom = filters.computerCountFilterFrom;
      this.computerCountFilterTo = filters.computerCountFilterTo;
      this.hasWiFiFilter = filters.hasWiFiFilter;
      this.areaFilterFrom = filters.areaFilterFrom;
      this.areaFilterTo = filters.areaFilterTo;
      this.lastRenovationDateStart = new Date(filters.lastRenovationDateStart);
      this.lastRenovationDateEnd = new Date(filters.lastRenovationDateEnd);
      this.hasFotoFilter = filters.hasFotoFilter;
  
      // Применение фильтров сразу после загрузки
      this.applyFilters();
    }

  }

  /* Загружаем данные по аудиториям */
  private loadRooms() {
    this.rooms = ROOMS.flatMap(room => 
      room.classRooms.map(classRoom => ({
        buildingId: room.buildingId,
        buildingName: room.buildingName,
        classRoomId: classRoom.classRoomId,
        number: classRoom.number,
        name: classRoom.name,
        type: classRoom.type.name,
        purpose: classRoom.purpose[0]?.name,
        owner: classRoom.owner.name,
        status: classRoom.status.name,

        capacity: classRoom.additionalSections[0]?.capacity,
        computerCount: classRoom.additionalSections[0]?.computerCount,
        hasWiFi: classRoom.additionalSections[0]?.hasWiFi,
        hasProjector: classRoom.additionalSections[0]?.hasProjector,
        hasWiredNetwork: classRoom.additionalSections[0]?.hasWiredNetwork,
        hasScreen: classRoom.additionalSections[0]?.hasScreen,
        hasBoard: classRoom.additionalSections[0]?.hasBoard,
        portableEquipment: classRoom.additionalSections[0]?.portableEquipment,

        area: classRoom.additionalSections[0]?.area,
        lastRenovationDate: classRoom.additionalSections[0]?.lastRenovationDate,
        hasFoto: classRoom.additionalSections[0]?.hasFoto,
      }))
    );
    this.filteredRooms = this.rooms; // Изначально все аудитории отображаются
  }
  
  /* Создание синхронизации фильтров */
  public syncBuildingFilter() {
    if (this.listBuildings.includes("Все")) {
        this.buildingFilter = "Все"; // Устанавливаем значение "Все" при его выборе
    } else if (this.listBuildings.length > 0) {
        this.buildingFilter = this.listBuildings[0]; // Устанавливаем первое выбранное значение
    } else {
        this.buildingFilter = ''; // Сбрасываем фильтр если ничего не выбрано
    }
    
    this.applyFilters(); // Применяем фильтры после синхронизации
  }
  public syncTypeFilter() {
    if (this.listTypes.includes("Все")) {
        this.typeFilter = "Все"; // Устанавливаем значение "Все" при его выборе
    } else if (this.listTypes.length > 0) {
        this.typeFilter = this.listTypes[0]; // Устанавливаем первое выбранное значение
    } else {
        this.typeFilter = ''; // Сбрасываем фильтр если ничего не выбрано
    }
    
    this.applyFilters(); // Применяем фильтры после синхронизации
  }
  public syncPurposeFilter() {
    if (this.listPurposes.includes("Все")) {
        this.purposeFilter = "Все"; // Устанавливаем значение "Все" при его выборе
    } else if (this.listPurposes.length > 0) {
        this.purposeFilter = this.listPurposes[0]; // Устанавливаем первое выбранное значение
    } else {
        this.purposeFilter = ''; // Сбрасываем фильтр если ничего не выбрано
    }
    
    this.applyFilters(); // Применяем фильтры после синхронизации
  }

  /* Применение фильтра */
  public applyFilters() {
    
    this.filteredRooms = this.rooms.filter(room => {
      const matchesBuilding = this.buildingFilter === 'Все' || room.buildingName === this.buildingFilter;
      const matchesType = this.typeFilter === 'Все' || room.type === this.typeFilter;
      const matchesPurpose = this.purposeFilter === 'Все' || room.purpose === this.purposeFilter;
      const matchesStatus = this.statusFilter === 'Все' || room.status === this.statusFilter;
      const matchesNumber = this.numberFilter === '' || room.number.includes(this.numberFilter);
      const matchesOwner = this.ownerFilter === '' || room.owner.includes(this.ownerFilter);

      const matchesCapacity = (this.capacityFilterFrom <= room.capacity) && (this.capacityFilterTo >= room.capacity);
      const matchesComputerCount = (this.computerCountFilterFrom <= room.computerCount) && (this.computerCountFilterTo >= room.computerCount);
      const matchesHasWiFi = this.hasWiFiFilter === 'Все'|| room.hasWiFi === (this.hasWiFiFilter == 'Есть' ? true : false);

      const matchesArea = (this.areaFilterFrom <= room.area) && (this.areaFilterTo >= room.area);
      const matchesLastRenovationDate = (this.lastRenovationDateStart <= room.lastRenovationDate) && (this.lastRenovationDateEnd >= room.lastRenovationDate);
      const matchesHasFoto = this.hasFotoFilter === 'Все'|| room.hasFoto === (this.hasFotoFilter == 'Есть' ? true : false);

      const matchesRoomId = this.checkedKeys.length === 0 || this.checkedKeys.includes(room.classRoomId);

      return matchesBuilding && matchesType && matchesPurpose && matchesStatus && matchesNumber && matchesOwner &&
             matchesCapacity && matchesComputerCount && matchesHasWiFi &&
             matchesArea && matchesLastRenovationDate && matchesHasFoto && matchesRoomId;
    });
    this.saveFilters(); // Сохранение фильтров после их применения
    this.updateDisplayedRooms(); // Обновляем показываемые комнаты
  } 

  /* Сохранение данных фильтра в localStorage */
  saveFilters() {
    const filters = {
      buildingFilter: this.buildingFilter,
      typeFilter: this.typeFilter,
      purposeFilter: this.purposeFilter,
      statusFilter: this.statusFilter,
      numberFilter: this.numberFilter,
      ownerFilter: this.ownerFilter,
      capacityFilterFrom: this.capacityFilterFrom,
      capacityFilterTo: this.capacityFilterTo,
      computerCountFilterFrom: this.computerCountFilterFrom,
      computerCountFilterTo: this.computerCountFilterTo,
      hasWiFiFilter: this.hasWiFiFilter,
      areaFilterFrom: this.areaFilterFrom,
      areaFilterTo: this.areaFilterTo,
      lastRenovationDateStart: this.lastRenovationDateStart.toISOString(),
      lastRenovationDateEnd: this.lastRenovationDateEnd.toISOString(),
      hasFotoFilter: this.hasFotoFilter
    };

    localStorage.setItem('roomFilters', JSON.stringify(filters));
  }

  /* Очистка фильтра */
  public clearFilters() {
    this.buildingFilter = 'Все';
    this.typeFilter = 'Все';
    this.purposeFilter = 'Все';
    this.statusFilter = 'Все';
    this.numberFilter = '';
    this.ownerFilter = '';

    this.capacityFilterFrom = 0;
    this.capacityFilterTo = 100;
    this.computerCountFilterFrom = 0;
    this.computerCountFilterTo = 100;
    this.hasWiFiFilter = 'Все';

    this.areaFilterFrom = 30;
    this.areaFilterTo = 200;
    this.lastRenovationDateStart = new Date("2000-01-01");
    this.lastRenovationDateEnd = new Date("2100-01-01");
    this.hasFotoFilter = 'Все';

    this.checkedKeys = this.getAllClassRoomIds(ROOMS);
    this.listBuildings = ["Все"];
    this.listTypes = ["Все"];
    this.listPurposes = ["Все"];

    this.filteredRooms = this.rooms; // Сбрасываем фильтры
    this.updateDisplayedRooms(); // Обновляем показываемые комнаты
    
    this.saveFilters(); // Сохранение фильтров после их применения
  }
}