//cria papéis
module.exports = (app) => {
  if (!process.env.AEF_USERS)
    throw new Error('Informe a variavel de ambiente AEF_USERS !')

  let adminRole, alunoRole, adminUsers = JSON.parse(process.env.AEF_USERS)

  //cria role admin
  app.models.Role.create({
    name: 'admin'
  }, function(err, role) {
    if (err && err.statusCode === 422) {
      console.log('role admin já existe')
    } else if (err) {
      throw err
    } else {
      console.log('criado role admin')
      adminRole = role
    }
  })

  //cria role aluno: não é necessário no momento, usaremos por enquanto conta padrão como aluno
  // Role.create({
  //   name: 'aluno'
  // }, function(err, role) {
  //   if (err) throw err
  //   alunoRole = role
  // })

  /*
  exemplo de conteúdo da variavel de ambiente AEF_USERS:
  [
    {username: 'John', email: 'john@doe.com', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com', password: 'opensesame'}
  ]
  */
  
  app.models.usuario.create(adminUsers, function(err, usuarios) {
    if (err && err.some(e => e.statusCode === 422)) {
      console.log('usuarios admin já existem')
    } else if (err) {
      throw err
    } else {
      console.log('criado usuarios admin')

      //cria vinculo de admin para os usuarios
      let envAdminRoles = usuarios.map(u => ({
        principalType: app.models.RoleMapping.USER,
        principalId: u.id
      }))
      adminRole.principals.create(envAdminRoles, function(err, principal) {
        if (err && err.statusCode === 422) {
          console.log('ligacao de roles admins já existem')
        } else if (err) {
          throw err
        } else {
          console.log('criado ligacao de role admins')
        }
      })
    }
  })
};
