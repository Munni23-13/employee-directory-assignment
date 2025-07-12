// Initial mock employee data
let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Carol", lastName: "Brown", email: "carol@example.com", department: "Finance", role: "Analyst" }
];



// Show employees in the list
function showEmployees(list) {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";


  list.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="card-buttons">
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

}

// Add or Update Employee
document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("empId").value;
  const newEmp = {
    id: parseInt(id),
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    department: document.getElementById("department").value.trim(),
    role: document.getElementById("role").value.trim()
  };

  // Simple validation
  if (!newEmp.firstName || !newEmp.lastName || !newEmp.email || !newEmp.department || !newEmp.role) {
    alert("All fields are required.");
    return;
  }

  // Check if editing or adding new
  const index = employees.findIndex(e => e.id === newEmp.id);
  if (index > -1) {
    employees[index] = newEmp;
  } else {
    employees.push(newEmp);
  }

  this.reset();
  hideForm();
  showEmployees(employees);
});

// Delete employee
function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(emp => emp.id !== id);
    showEmployees(employees);
  }
}

// Edit employee
function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (emp) {
    document.getElementById("empId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
    showForm();
  }
}

// Search
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  showEmployees(filtered);
});

// Filter
document.getElementById("applyFilter").addEventListener("click", function () {
  const name = document.getElementById("filterFirstName").value.toLowerCase();
  const dept = document.getElementById("filterDepartment").value.toLowerCase();
  const role = document.getElementById("filterRole").value.toLowerCase();

  const filtered = employees.filter(emp =>
    (!name || emp.firstName.toLowerCase().includes(name)) &&
    (!dept || emp.department.toLowerCase().includes(dept)) &&
    (!role || emp.role.toLowerCase().includes(role))
  );

  showEmployees(filtered);
});

// Sort
document.getElementById("sortBy").addEventListener("change", function () {
  const key = this.value;
  if (key) {
    employees.sort((a, b) => a[key].localeCompare(b[key]));
    showEmployees(employees);
  }
});



// Items per page
document.getElementById("itemsPerPage").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  showEmployees(employees);
});

// Show and hide form
function showForm() {
  document.getElementById("employeeFormContainer").classList.remove("hidden");
}

function hideForm() {
  document.getElementById("employeeFormContainer").classList.add("hidden");
}

// Add button click
document.getElementById("addBtn").addEventListener("click", () => {
  document.getElementById("employeeForm").reset();
  document.getElementById("empId").value = "";
  showForm();
});

// Cancel button
document.getElementById("cancelBtn").addEventListener("click", hideForm);

// Filter toggle
document.getElementById("filterBtn").addEventListener("click", () => {
  document.getElementById("filterPanel").classList.toggle("hidden");
});

// Load on page
window.onload = () => {
  showEmployees(employees);
};
