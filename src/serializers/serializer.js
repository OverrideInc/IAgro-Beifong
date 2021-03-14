class Serializer {
  constructor({ collectionName }) {
    if (!collectionName) throw new Error('Serializer needs collectionName');
    this.collectionName = collectionName;
    this.baseFields = [];
    this.meta = {};
  }

  serialize(object, { useCollectionName = false } = {}) {
    if (!object || typeof object !== 'object') return null;

    if (Array.isArray(object)) {
      const serializedCollection = object.map((elem) =>
        this.serializeObject(elem)
      );
      if (useCollectionName) {
        return { [this.collectionName]: serializedCollection };
      }
      return serializedCollection;
    }

    return this.serializeObject(object);
  }

  // "Private" functions
  serializeObject(object) {
    const attributes = this.serializeBaseFields(object);
    const customAttributes = this.serializeMetaAttributes(object);

    return { ...attributes, ...customAttributes };
  }

  serializeBaseFields(object) {
    const serializedAttributes = {};
    this.baseFields.forEach((includedAttribute) => {
      if (includedAttribute in object) {
        serializedAttributes[includedAttribute] = object[includedAttribute];
      } else {
        serializedAttributes[includedAttribute] = null;
      }
    });

    return serializedAttributes;
  }

  serializeMetaAttributes(object) {
    const serializedAttributes = {};

    Object.entries(this.meta).forEach(([key, metadataValue]) => {
      serializedAttributes[key] = Serializer.processMetaAttribute(
        metadataValue,
        object
      );
    });

    return serializedAttributes;
  }

  static processMetaAttribute(metadataValue, object) {
    if (typeof metadataValue === 'function') {
      return metadataValue(object);
    }

    throw new Error(
      'A function should be provided to serialize the meta-attributes'
    );
  }
}

module.exports = Serializer;
