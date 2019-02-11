import {IField, IPage, ISection, IColumn} from "@adinfinity/ai-core-forms";

export function addField(field: IField) {
    return {
        type: 'add-field',
        field: field
    }
}

export function addSection(section: ISection) {
    return {
        type  : 'add-section',
        section: section
    }
}

export function addColumn(column: IColumn) {
    return {
        type  : 'add-column',
        column: column
    }
}

export function addPage(page: IPage) {
    return {
        type  : 'add-page',
        page: page
    }
}

export function removeField(field: IField) {
    return {
        type: 'remove-field',
        field: field
    }
}

export function removeColumn(column: IColumn) {
    return {
        type: 'remove-column',
        column: column
    }
}

export function removeSection(section: ISection) {
    return {
        type: 'remove-section',
        section: section
    }
}

export function removePage(page: IPage) {
    return {
        type: 'remove-page',
        page: page
    }
}