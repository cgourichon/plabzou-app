<script setup>
import DataTable from "@/components/Table/DataTable.vue";
import {useRequestStore} from "@/stores/request.store";
import {getDatetimeShortFormat} from "@/utils/dayjs";
import EditAction from "@/components/Action/EditAction.vue";

const requestStore = useRequestStore();
requestStore.fetchRequests();

const components = {
    actionsCellRender: EditAction
}

const booleanResponse = value => {
    let icon;
    let color;

    switch (value) {
        case false: icon = 'interface-close-small'; color = 'n-color-text-error' ; break;
        case true: icon = 'interface-checked-small'; color = 'n-color-text-success' ; break;
        case null:
        default: icon = 'interface-time'; color = 'n-color-text-weaker';
    }
    return {icon: icon, color: color};
}
const columns = [
    {
        field: "id",
        headerName: "ID",
        type: "rightAligned",
    },
    {
        field: "timeslot.training.name",
        headerName: "Formation",
    },
    {
        field: "timeslot.starts_at",
        headerName: "Date de début",
        valueFormatter: ({value}) => getDatetimeShortFormat(value),
    },
    {
        field: "timeslot.ends_at",
        headerName: "Date de fin",
        valueFormatter: ({value}) => getDatetimeShortFormat(value)
    },
    {
        field: "teacher.full_name",
        headerName: "Formateur",
    },
    {
        field: "administrative_employee.full_name",
        headerName: "Demandeur",
    },
    {
        field: "is_approved_by_teacher",
        headerName: "Approuvé par le formateur",
        cellRenderer: params => {
            return `<span class="${booleanResponse(params.data.is_approved_by_teacher).color}"><nord-icon name="${booleanResponse(params.data.is_approved_by_teacher).icon}"></nord-icon></span>`;
        },
        cellStyle: {textAlign: 'center'}
    },
    {
        field: "is_approved_by_admin",
        headerName: "Approuvé par admin",
        cellRenderer: params => {
            return `<span class="${booleanResponse(params.data.is_approved_by_admin).color}"><nord-icon name="${booleanResponse(params.data.is_approved_by_admin).icon}"></nord-icon></span>`;
        },
        cellStyle: {textAlign: 'center'}
    },
    {
        field: "comment",
        headerName: "Commentaire",
        valueFormatter: ({value}) => value ? value : '-',
        cellStyle: params => {
            return params.data.comment ? '' : {textAlign: 'center'}
        }
    },
    {
        field: "actions",
        headerName: "Modifier",
        cellRenderer: "actionsCellRender",
    }
]
</script>

<template>
    <nord-card>
        <h2 slot="header">Liste des demandes</h2>

        <div slot="header-end">
            <RouterLink to="/gestion/demandes/ajouter">
                <nord-button size="s" variant="primary">
                    <nord-icon slot="start" name="interface-add"/>
                    Créer une nouvelle demande
                </nord-button>
            </RouterLink>
        </div>

        <DataTable :columns="columns" :data="requestStore.requests" :components="components"/>
    </nord-card>
</template>

<style scoped>

</style>