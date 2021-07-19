import { api }  from "../services/api";

export const sortProducts = async (products, type) => {
    switch (type) {
        case 'asc':
            const asc = products.sort(function (item1, item2) {
                if (item1.price > item2.price) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return asc;
        case 'desc':
            const desc = products.sort(function (item1, item2) {
                if (item1.price < item2.price) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return desc;
        case 'name':
            const name = products.sort(function (item1, item2) {
                if (item1.name < item2.name) {
                    return -1;
                } else {
                    return true;
                }
            });
            return name;
        default: 
            const origin = await api.get(`categories/${products}`);
            return origin.data.items;
    }
}

export const filterProducts = async (id, type, value) => {
    switch (type) {
        case 'color':
            const color = await api.get(`categories/${id}?color=${value}`);
            return color.data;
        case 'gender':
            const gender = await api.get(`categories/${id}?gender=${value}`);
            return gender.data;
        case 'type':
            const type = await api.get(`categories/${id}?type=${value}`);
            return type.data;
        case 'search':
            const search = await api.get(`categories/${id}?search=${value}`);
            return search.data;
        default: 
            console.warn('Requisição não encontrada!');
    }
}