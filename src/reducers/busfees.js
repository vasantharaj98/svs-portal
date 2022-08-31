export default ( busfees = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
                return [...busfees, action.payload];
        default:
            return busfees;
    }
};