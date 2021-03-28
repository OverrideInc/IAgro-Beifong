class Serializer {
  constructor({ collectionName }) {
    /* istanbul ignore next */
    if (!collectionName) throw new Error('Serializer needs collectionName');
    this.collectionName = collectionName;
    this.baseFields = [];
  }

  serialize(object) {
    if (!object || typeof object !== 'object') return null;

    if (Array.isArray(object)) {
      const serializedCollection = object.map((elem) =>
        this.serializeObject(elem)
      );
      return serializedCollection;
    }

    return this.serializeObject(object);
  }

  serializeObject(object) {
    const attributes = this.serializeBaseFields(object);

    return attributes;
  }

  serializeBaseFields(object) {
    const serializedAttributes = {};
    this.baseFields.forEach((includedAttribute) => {
      serializedAttributes[includedAttribute] = object[includedAttribute];
    });

    return serializedAttributes;
  }
}

module.exports = Serializer;
