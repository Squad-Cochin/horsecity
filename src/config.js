module.exports = {
  pageLimit : 10,    
     status : {
        TRUE : 'TRUE',
        FALSE : 'FALSE',
        confirmed : `CONFIRMED`,
        notconfirmed : `NOTCONFIRMED`,
        yes : 'YES',
        no : 'NO'
      },

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
        applicationSettings : 13,
        review : 14
    },
    Role : 
    {
      admin : 1,
      service_provider : 2,
      super_admin : 3
    }

}


