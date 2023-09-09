/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hashemmohamed98.beans;

import com.hashemmohamed98.entities.Department;
import com.hashemmohamed98.facade.DepartmentFacade;
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
@Named("departmentBean")
@ViewScoped
public class DepartmentBean implements Serializable {

    @EJB
    private DepartmentFacade departmentFacade;
    private List<Department> departments = new ArrayList<>();
    private Department department = new Department();

    @PostConstruct
    public void init() {
        departments = departmentFacade.findAllActiveDepartments();
    }

    public void findDepartmentsWithFilters() {

        departments = departmentFacade.findDepartmentsByCriteria(department);
        FacesContext.getCurrentInstance().
                addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Search Completed", ""));
    }

    public void addDepartment() {
        if (!formsValidation()) {
            departmentFacade.create(department);
            resetDepartment();
        }
    }

    public boolean formsValidation() {

        boolean validationFound = false;
        if (!department.getName().equals("") && department.getActive() != null) {

            for (Department dep : departments) {

                if (dep.getName().equals(department.getName())
                        && dep.getId() != department.getId()) {

                    validationFound = true;

                    resetDepartment();

                    FacesContext.getCurrentInstance().
                            addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Action Failed ,Department Name Already Exists", ""));

                    return validationFound;
                }
            }
            if (department.getActive() == false && department.getEmployees() != null) {
                if (!department.getEmployees().isEmpty()) {

                    validationFound = true;

                    FacesContext.getCurrentInstance().
                            addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Unable To Deactivate Department ", "Department Has Users Assigned To It"));

                    resetDepartment();

                    return validationFound;
                }
            }
            FacesContext.getCurrentInstance().
                    addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, " Action Is Saved Successfully ", ""));
        } else {
            validationFound = true;

            FacesContext.getCurrentInstance().
                    addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Action Failed ,All Form Fields Are Required", ""));
        }
        return validationFound;
    }

    public void onDepartmentClick(Department department) {
        this.department = department;
    }

    public void editDepartment() {
        if (!formsValidation()) {
            departmentFacade.edit(department);
            resetDepartment();
        }

        init();
    }

    public void deleteDepartment() {
        if (department.getId() != 0) {

            if (!department.getEmployees().isEmpty()) {

                FacesContext.getCurrentInstance().
                        addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Unable To Deactivate Department ", "Department Has Users Assigned To It"));

                resetDepartment();

                return;
            }
            departmentFacade.deleteDepartment(department.getId());

            FacesContext.getCurrentInstance().
                    addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, " Deactivated Department Successfully ", ""));

            resetDepartment();

        } else {
            FacesContext.getCurrentInstance().
                    addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, " Action Failed ,Department Does Not Exists", ""));

            resetDepartment();
        }
    }

    public void resetDepartment() {
        department = new Department();
        init();
    }

    public List<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(List<Department> departments) {
        this.departments = departments;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

}
