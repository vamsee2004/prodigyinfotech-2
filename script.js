document.getElementById('employee-form').addEventListener('submit', saveEmployee);

function saveEmployee(event) {
    event.preventDefault();

    const employeeId = document.getElementById('employeeId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const dateOfHire = document.getElementById('dateOfHire').value;
    const salary = document.getElementById('salary').value;

    const employee = { employeeId, name, email, position, department, dateOfHire, salary };

    if (employeeId) {
        updateEmployee(employee);
    } else {
        addEmployee(employee);
    }

    document.getElementById('employee-form').reset();
    fetchEmployees();
}

function addEmployee(employee) {
    const employees = getEmployees();
    employee.employeeId = Date.now().toString();
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
}

function updateEmployee(updatedEmployee) {
    const employees = getEmployees();
    const index = employees.findIndex(emp => emp.employeeId === updatedEmployee.employeeId);
    employees[index] = updatedEmployee;
    localStorage.setItem('employees', JSON.stringify(employees));
}

function deleteEmployee(employeeId) {
    const employees = getEmployees();
    const filteredEmployees = employees.filter(emp => emp.employeeId !== employeeId);
    localStorage.setItem('employees', JSON.stringify(filteredEmployees));
    fetchEmployees();
}

function fetchEmployees() {
    const employees = getEmployees();
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.classList.add('employee');
        employeeDiv.innerHTML = `
            <div>
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Position:</strong> ${employee.position}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Date of Hire:</strong> ${employee.dateOfHire}</p>
                <p><strong>Salary:</strong> ${employee.salary}</p>
            </div>
            <div>
                <button onclick="editEmployee('${employee.employeeId}')">Edit</button>
                <button onclick="deleteEmployee('${employee.employeeId}')">Delete</button>
            </div>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

function editEmployee(employeeId) {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.employeeId === employeeId);
    document.getElementById('employeeId').value = employee.employeeId;
    document.getElementById('name').value = employee.name;
    document.getElementById('email').value = employee.email;
    document.getElementById('position').value = employee.position;
    document.getElementById('department').value = employee.department;
    document.getElementById('dateOfHire').value = employee.dateOfHire;
    document.getElementById('salary').value = employee.salary;
}

function getEmployees() {
    return JSON.parse(localStorage.getItem('employees')) || [];
}

// Initial fetch to populate employee list
fetchEmployees();