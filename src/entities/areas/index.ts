export {
    createArea,
    editArea,
    getAllAreas,
    getArea,
    deleteArea,
    getAreas,
    getAreasPaginationInfo
} from './api/repository';

export {type Area} from './model/area';
export {validateAreaForm} from './model/validate-area-form';

export {RussianMap} from './ui/russian-map.ui';
export {AreasTable, type AreasTableProps} from './ui/areas-table.ui';
export {AreaForm, type AreaFormProps, type AreaFormState} from './ui/area-form.ui';

