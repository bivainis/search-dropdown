const employeeDataMock = {
  data: [
    {
      type: 'employees',
      id: '323',
      attributes: {
        identifier: null,
        firstName: 'Harriet',
        lastName: 'McKinney',
        name: 'Harriet McKinney',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '324',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '201',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '139',
      links: {
        self: 'http://localhost:3000/v1/employees/139',
      },
      attributes: {
        identifier: null,
        firstName: 'Harriet',
        lastName: 'Banks',
        name: 'Harriet Banks',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '140',
          },
        },
        phones: {
          data: [],
        },
      },
    },
    {
      type: 'employees',
      id: '142',
      links: {
        self: 'http://localhost:3000/v1/employees/142',
      },
      attributes: {
        identifier: null,
        firstName: 'Mathilda',
        lastName: 'Summers',
        name: 'Mathilda Summers',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '143',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '140',
      links: {
        self: 'http://localhost:3000/v1/employees/140',
      },
      attributes: {
        identifier: null,
        firstName: 'Eugene',
        lastName: 'Wong',
        name: 'Eugene Wong',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '141',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '340',
      links: {
        self: 'http://localhost:3000/v1/employees/340',
      },
      attributes: {
        identifier: null,
        firstName: 'New',
        lastName: 'Manager',
        name: 'New Manager',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '341',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '145',
      links: {
        self: 'http://localhost:3000/v1/employees/145',
      },
      attributes: {
        identifier: null,
        firstName: 'Marguerite',
        lastName: 'Ryan',
        name: 'Marguerite Ryan',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '146',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '171',
      links: {
        self: 'http://localhost:3000/v1/employees/171',
      },
      attributes: {
        identifier: null,
        firstName: 'Donald',
        lastName: 'Butler',
        name: 'Donald Butler',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '172',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '151',
      links: {
        self: 'http://localhost:3000/v1/employees/151',
      },
      attributes: {
        identifier: null,
        firstName: 'Jim',
        lastName: 'Carlson',
        name: 'Jim Carlson',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '152',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
    {
      type: 'employees',
      id: '141',
      links: {
        self: 'http://localhost:3000/v1/employees/141',
      },
      attributes: {
        identifier: null,
        firstName: 'Alta',
        lastName: 'Maxwell',
        name: 'Alta Maxwell',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '142',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '139',
          },
        },
      },
    },
  ],
  included: [
    {
      type: 'accounts',
      id: '140',
      links: {
        self: 'http://localhost:3000/v1/accounts/140',
      },
      attributes: {
        email: 'harriet.banks@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: 'en-GB',
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '141',
      links: {
        self: 'http://localhost:3000/v1/accounts/141',
      },
      attributes: {
        email: 'eugene.wong@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '142',
      links: {
        self: 'http://localhost:3000/v1/accounts/142',
      },
      attributes: {
        email: 'alta.maxwell@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: 'en-GB',
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '143',
      links: {
        self: 'http://localhost:3000/v1/accounts/143',
      },
      attributes: {
        email: 'mathilda.summers@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '146',
      links: {
        self: 'http://localhost:3000/v1/accounts/146',
      },
      attributes: {
        email: 'marguerite.ryan@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '152',
      links: {
        self: 'http://localhost:3000/v1/accounts/152',
      },
      attributes: {
        email: 'jim.carlson@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '172',
      links: {
        self: 'http://localhost:3000/v1/accounts/172',
      },
      attributes: {
        email: 'donald.butler@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '324',
      links: {
        self: 'http://localhost:3000/v1/accounts/324',
      },
      attributes: {
        email: 'harriet.mckinney@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: null,
        timezoneEffective: null,
      },
    },
    {
      type: 'accounts',
      id: '341',
      links: {
        self: 'http://localhost:3000/v1/accounts/341',
      },
      attributes: {
        email: 'manager@kinetar.com',
        locale: null,
        timezone: null,
        bouncedAt: null,
        bounceReason: null,
        localeEffective: 'en-US',
        timezoneEffective: null,
      },
    },
    {
      type: 'employees',
      id: '139',
      links: {
        self: 'http://localhost:3000/v1/employees/139',
      },
      attributes: {
        identifier: null,
        firstName: 'Harriet',
        lastName: 'Banks',
        name: 'Harriet Banks',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '140',
          },
        },
        phones: {
          data: [],
        },
      },
    },
    {
      type: 'employees',
      id: '201',
      links: {
        self: 'http://localhost:3000/v1/employees/201',
      },
      attributes: {
        identifier: null,
        firstName: 'Derrick',
        lastName: 'Cummings',
        name: 'Derrick Cummings',
        features: ['engagement'],
        avatar: null,
      },
      relationships: {
        company: {
          data: {
            type: 'companies',
            id: '5',
          },
        },
        account: {
          data: {
            type: 'accounts',
            id: '202',
          },
        },
        phones: {
          data: [],
        },
        Manager: {
          data: {
            type: 'employees',
            id: '194',
          },
        },
      },
    },
  ],
  meta: {
    page: {
      total: 9,
    },
  },
  links: {
    self: 'http://localhost:3000/v1/employees/contexts/company_5?per_page=25&q=harriet&sort=score&order=desc&include=account%2Cphones%2CLast%20Year%20Bonus%2CBusiness%20Unit%2CCommute%20Time%2CManager&simple=false',
    first:
      'http://localhost:3000/v1/employees/contexts/company_5?per_page=25&q=harriet&sort=score&order=desc&include=account%2Cphones%2CLast%20Year%20Bonus%2CBusiness%20Unit%2CCommute%20Time%2CManager&simple=false',
    last: 'http://localhost:3000/v1/employees/contexts/company_5?per_page=25&page=1&q=harriet&sort=score&order=desc&include=account%2Cphones%2CLast%20Year%20Bonus%2CBusiness%20Unit%2CCommute%20Time%2CManager&simple=false',
  },
};
export default employeeDataMock;
