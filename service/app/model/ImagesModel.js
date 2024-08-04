class ImagesModel {
    constructor(imageModel) {
        this.id = imageModel.id,
        this.name = imageModel.name,
        this.content = imageModel.content,
        this.type = imageModel.type,
        this.size = imageModel.size,
        this.id_packedLunch = imageModel.id_packedLunch
    }
  }
  
  module.exports = ImagesModel;