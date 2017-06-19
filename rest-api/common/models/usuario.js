'use strict';

module.exports = Usuario => {
  Usuario.validatesUniquenessOf('codigo')

  /**
   *
   * @param {string} alunoId
   * @param {Function(Error, aulasFaltantes)} callback
   */
  Usuario.aulasFaltantes = (alunoId, cb) => {
    Usuario.findById(alunoId, {
      fields: ['fase']
    }, (err, aluno) => {
      if (err) cb(err)

      Usuario.comparecimentoAula(alunoId, {
        fields: ['aulaId']
      }, (err, aulasCompareceu) => {
        if (err) cb(err)

        Usuario.app.models.aula.filter({
          where: {
            and: [{
                fase: {
                  lt: aluno.fase
                }
              },
              {
                id: {
                  nin: aulasCompareceu.map(a => a.aulaId)
                }
              }
            ]
          }
        }, (err, aulasFaltantes) => {
          cb(err, aulasFaltantes)
        })
      })
    })
  }
}
