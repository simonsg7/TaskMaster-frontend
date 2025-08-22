import React from 'react';

export const getCardsData = (array) => {
    if (!Array.isArray(array)) return [];

    const cards = array.map(item => ({
        id: item.id,
        title: item.name,
        description: item.description,
        category: item.category,
        priority: item.priority,
        expectation_date: item.expectation_date,
        state: item.state,
        // user: [item.users_detail.first_name, ' ', item.users_detail.last_name].join('')
    }));

    console.log('Cards data processed:', cards);
    return cards;
}