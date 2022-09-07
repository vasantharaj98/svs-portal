export default ( busfees = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
                return [...busfees, action.payload];
        case 'UPDATE':
                return busfees.map((fees) => fees._id === action.payload._id ? action.payload : fees );
        default:
            return busfees;
    }
};