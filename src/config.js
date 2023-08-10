module.exports = {
  pageLimit : 5,
  roles :
      {
          admin : "ADMIN",
          service_provider : "SERVICE PROVIDER"
      },
    
     status : {
        TRUE : 'TRUE',
        FALSE : 'FALSE',
        confirmed : `CONFIRMED`,
        notconfirmed : `NOTCONFIRMED`
      },
  // modules : [
  // {
  //   id : 1,
  //   name : '  '
  // },    
  // {
  //   id : 2,
  //   name : 'DASHBOARD'
  // },
  // {
  //   id : 3,
  //   name : 'SERVICE PROVIDER'
  // },    
  // {
  //   id : 4,
  //   name : 'CUSTOMERS'
  // }
  // ],
  modules :
    {
        menu : 1,
        dashboard : 2,
        service_provider : 3,
        customers : 4,
        vehicles : 5,
        drivers : 6,
        enquiries : 7,
        quotations : 8,
        trip_details :9,
        invoices : 10, 
        accounts :11,
        reports : 12,
        applicationSettings : 13
    },
    Role : 
    {
      admin : 1,
      service_provider : 2,
      super_admin : 3
    }

}


