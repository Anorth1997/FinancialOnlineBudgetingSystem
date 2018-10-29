class Company:

    def __init__(self, company_name, CEO):
        self.company_name = company_name
        self.CEO = CEO
        self.fdHead = None
        self.departments = []  ## list of departments
        self.budget = 0
        self.revenue = 0
    
    def get_name(self):
        return self.company_name
    
    def get_FD(self):
        return self.fdHead
    
    def set_FD(self, financialDepartmentHead):
        self.fdHead = financialDepartmentHead
    
    def get_departments(self):
        return self.departments
    
    def set_departments(self, dpt_list):
        self.departments = dpt_list.copy()
    
    def get_budget(self):
        return self.budget
    
    def set_budget(self, newBudget):
        self.budget = newBudget
    
    def get_revenue(self):
        return self.revenue
    
    def set_revenue(self, newRevenue):
        self.revenue = newRevenue