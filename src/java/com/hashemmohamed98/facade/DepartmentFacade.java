/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hashemmohamed98.facade;

import com.hashemmohamed98.entities.Department;
import java.util.Collections;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author hashemmohamed98
 */
@Stateless
public class DepartmentFacade extends AbstractFacade<Department> {

    @PersistenceContext(unitName = "EmployeeManagementPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public DepartmentFacade() {
        super(Department.class);
    }

    public List<Department> findAllActiveDepartments() {
        Query query = em.createQuery("SELECT d from Department d where d.active = true");
        try {
            return query.getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public void deleteDepartment(int depId) {
        Query query = em.createQuery("Update Department d set d.active=false where d.id =:depId");
        query.setParameter("depId", depId);
        query.executeUpdate();
    }

    public List<Department> findDepartmentsByCriteria(Department department) {
        try {
            Query query = em.createQuery("SELECT d FROM Department d WHERE (:name = '' or d.name LIKE :name) and (:active is null or d.active =:active)");
            query.setParameter("name", "%" + department.getName() + "%");
            query.setParameter("active", department.getActive());
            return query.getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}
