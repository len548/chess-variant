class Card {
    constructor(id, name, effect_description, effect, point_value, uniqueness, contiuing_effect) {
        this.id = id // string
        this.name = name // string
        this.description = effect_description // string
        this.effect = effect // function
        this.point_value = point_value // number
        this.uniqueness = uniqueness // boolean
        this.continuing_effect = contiuing_effect // boolean
    }
    toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            point_value: this.point_value,
            uniqueness: this.uniqueness,
            continuing_effect: this.continuing_effect,
        }
    }
    static fromJson(json) {
        return new Card(json.id, json.name, json.description, json.point_value, json.uniqueness, json.continuing_effect)
    }
}

export default Card;