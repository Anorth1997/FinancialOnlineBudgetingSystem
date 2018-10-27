class Company:

    def __init__(self, company_name, CEO):
        self.company_name = company_name
        self.CEO = CEO
        self.FD = None
        self.Dpts = []  ## list of departments
        self.budget = 0
        self.revenue = 0