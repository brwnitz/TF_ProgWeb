class KitPackedLunchModel {
    constructor(kitMarmita) {
        this.id = kitMarmita.id,
        this.id_kit = kitMarmita.id_kit,
        this.id_packedLunch = kitMarmita.id_packedLunch,
        this.qtdPackedLunch = kitMarmita.qtdPackedLunch
    }
}
  
module.exports = KitPackedLunchModel;