export const getJwt = () => {
    return 'bearer ' + localStorage.getItem('keytoken-jwt-jwt');
};