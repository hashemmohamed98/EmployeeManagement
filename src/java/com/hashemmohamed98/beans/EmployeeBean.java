/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hashemmohamed98.beans;

import com.hashemmohamed98.entities.Department;
import com.hashemmohamed98.entities.Employee;
import com.hashemmohamed98.facade.DepartmentFacade;
import com.hashemmohamed98.facade.EmployeeFacade;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Named;

/**
 *
 * @author hashemmohamed98
 */
@Named("employeeBean")
@ViewScoped
public class EmployeeBean implements Serializable {

    @EJB
    private EmployeeFacade employeeFacade;
    @EJB
    private DepartmentFacade departmentFacade;
    private Employee employee = new Employee();
    private List<Employee> employees = new ArrayList<>();
    private Department department = new Department();
    private List<Department> departments = new ArrayList<>();

    @PostConstruct
    public void init() {
        employees = employeeFacade.findAllActiveEmployees();
    }

    public List<Department> loadDepartments() {
        departments = departmentFacade.findAllActiveDepartments();
        return departments;
    }

    public void onEmployeeClick(Employee employee) {
        this.employee = employee;
        if (employee.getDepartment() == null) {
            department = new Department();
            return;
        }
        this.department = employee.getDepartment();
    }

    public void resetData() {
        System.out.println("Hello 2 yaba");
        employee = new Employee();
        department = new Department();
        init();
    }

    public void addEmployee() {
        if (!formsValidation()) {
            employee.setDepartment(department);
            employeeFacade.create(employee);
            resetData();
        }
    }

    public void findEmployeesWithFilters() {
        employee.setDepartment(department);
        employees = employeeFacade.findEmployeesByCriteria(employee);
        FacesContext.getCurrentInstance().
                addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Search Completed", ""));
    }

    public void editEmployee() {
        if (!formsValidation()) {
            employee.setDepartment(department);
            employeeFacade.edit(employee);
            resetData();
        }
    }

    public void deleteEmployee() {

        employeeFacade.deleteEmployee(employee.getId());
        resetData();
    }

    public boolean formsValidation() {
        boolean validationFound = false;
        for (Employee emp : employees) {
            if (emp.getCode().equals(employee.getCode()) && emp.getId() != employee.getId()) {
                validationFound = true;
                resetData();
                FacesContext.getCurrentInstance().
                        addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Action Failed ,Employee Code Already Exists", ""));

                return validationFound;
            }
        }
        FacesContext.getCurrentInstance().
                addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, " Action Is Saved Successfully ", ""));

        return validationFound;
    }

    //Setters And Getters
    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

}
