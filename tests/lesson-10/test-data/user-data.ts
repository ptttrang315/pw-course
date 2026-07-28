export interface RegisterUserData {
    userName: string;
    email: string;
    gender: string;
    hobbies: string[];
    interests: string;
    filePath: string;
    country: string;
    dateOfBirth: string;
    biography: string;
    rating: string;
    favoriteColor: string;
    newsletter: boolean;
    enableFeature: boolean;
    starRating: number;
}

export const registerUserData: RegisterUserData = {
    userName: 'TrangPham',
    email: 'trangptt@mail.com',
    gender: 'female',
    hobbies: ['Reading', 'Traveling'],
    interests: 'Science',
    filePath: 'tests/students-submission/trang-pham/lesson-10/test-data/01-dom.txt',
    country: 'Canada',
    dateOfBirth: '31051998',
    biography: 'Albert Einstein was a world-renowned theoretical physicist, born in Germany in 1879. He is best known for developing the theory of relativity, which fundamentally changed our understanding of time and space.',
    rating: '7',
    favoriteColor: '#004cff',
    newsletter: true,
    enableFeature: true,
    starRating: 3.2
};
