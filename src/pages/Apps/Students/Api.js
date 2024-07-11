const API_BASE_URL = 'http://localhost:8080/api/v1/alumnos';

export const getAllStudents = async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    if (!response.ok) throw new Error('Error fetching students');
    return response.json();
};

export const getStudentById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Error fetching student');
    return response.json();
};

export const saveStudent = async (student) => {
    const response = await fetch(`${API_BASE_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error saving student');
    }
    return response.json();
};

export const updateStudent = async (id, studentDetails) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentDetails),
    });
    if (!response.ok) throw new Error('Error updating student');
    return response.json();
};

export const deleteStudent = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error deleting student');
    return response.json();
};
