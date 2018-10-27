class User:

    def __init__(self, username, password, company):
        self.username = username
        self.password = password
        self.company = company


class CEO(User):
    
  
    def create_financial_department(self, fd_username, fd_password):
        if self.company.Financial_Department != null:
            raise Exception("FD already exists for this company!")
        self.company.Financial_Department = Financial_Department(fd_username, fd_password)
    def create_department(self, dpt_name, dpt_username, dpt_password):
        for dpt in self.company.department_list:
            if dpt_name == dpt.name:
                raise Exception("This Department already exists in this company!")
        d = Deparment_head(dpt_name, dpt_username, dpt_password)
        self.company.department_list.append(d)


class Financial_Department(User):
    pass

class Department_head(User):
    def __init__(self, name, username, password, company):
        super().__init__(username, password, company)
        self.name = name
        
        
    def submit_request(amount, text):
        #create a request here
        request = []
        if !(amount > self.company.threshold): # company needs threshold field
            self.company.Financial_Department.requests.append(request) # FD needs request array
        else:
            self.company.CEO.dep_req.append(request) # CEO needs another request array to handle the requests exceeding threshold
        return 0 #maybe for error checking?
        
        
