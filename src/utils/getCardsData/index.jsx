import React from 'react';

export const getCardsData = (array, type = 'task') => {
    if (!Array.isArray(array)) return [];

    const cards = array.map(item => {
        const baseCard = {
            id: item.id,
            title: item.name,
            description: item.description,
            category: item.category,
            priority: item.priority,
            expectation_date: item.expectation_date,
            state: item.state,
        };

        if (type === 'task') {
            return {
                ...baseCard,
                user: item.users_detail
                    ? `${item.users_detail.first_name} ${item.users_detail.last_name}`
                    : 'No User',
            };
        } else if (type === 'project') {
            return {
                ...baseCard,
                users: item.users?.map(user => `${user.first_name} ${user.last_name}`).join(', ') || 'No Users',
            };
        }
        
        return baseCard;
    });

    console.log('Cards data processed:', cards);
    return cards;
}