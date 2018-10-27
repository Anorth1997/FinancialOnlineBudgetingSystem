class User:

    def __init__(self, username, password, company):
        self.username = username
        self.password = password
        self.company = company


class CEO(User):
    
  
    def create_financial_department(self, fd_username, fd_password):
        
    def create_department(self, dpt_username, dpt_password):


class Financial_Department(User):
    pass

class Department_head(User):
    def __init__(self, username, password, company, ceo):
        super().__init__(username, password, company)
        self.ceo = ceo
    def submit_request(amount, text):
        #create a request here
        request = []
        if !(amount > self.company.threshold):
            self.company.Financial_Department.requests.append(request)
        else:
            self.company.CEO.dep_req.append(request)
        return 0
        
        
