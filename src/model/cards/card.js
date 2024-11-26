class Card {
    constructor(id, name, effect_description, effect, point_value, uniqueness, continuing_effect) {
        this.id = id // string
        this.name = name // string
        this.description = effect_description // string
        this.effect = effect // function
        this.point_value = point_value // number
        this.uniqueness = uniqueness // boolean
        this.continuing_effect = continuing_effect // boolean
    }
}

export default Card;