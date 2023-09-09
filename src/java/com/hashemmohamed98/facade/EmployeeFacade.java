/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.hashemmohamed98.facade;

import com.hashemmohamed98.entities.Employee;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 *
 * @author hashemmohamed98
 */
@Stateless
public class EmployeeFacade extends AbstractFacade<Employee> {

    @PersistenceContext(unitName = "EmployeeManagementPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public EmployeeFacade() {
        super(Employee.class);
    }

    public List<Employee> findAllActiveEmployees() {
        Query query = em.createQuery("SELECT e from Employee e where e.active = true");
        try {
            return query.getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }

    }

    public void deleteEmployee(int empId) {
        Query query = em.createQuery("Update Employee e set e.active=false where e.id =:empId");
        query.setParameter("empId", empId);
        query.executeUpdate();
    }

    public List<Employee> findEmployeesByCriteria(Employee employee) {
        try {
            Query query = em.createQuery("SELECT e FROM Employee e WHERE (:name = '' or e.name LIKE :name) and (:dep = 0 or e.department.id =:dep) and (:code= '' or e.code LIKE :code)  and (:active is null or e.active =:active)");
            query.setParameter("name", "%" + employee.getName() + "%");
            query.setParameter("dep", employee.getDepartment().getId());
            query.setParameter("code", "%" + employee.getCode() + "%");
            query.setParameter("active", employee.getActive());
            return query.getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
