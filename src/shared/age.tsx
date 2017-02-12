export const calculateAge = (birthMonth, birthDay, birthYear) => {
    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDate();
    let age = todayYear - birthYear;
    if (todayMonth < birthMonth - 1) {
        age--;
    }
    if (birthMonth - 1 == todayMonth && todayDay < birthDay) {
        age--;
    }
    return age;
};

