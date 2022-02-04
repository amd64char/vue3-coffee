
let PlanPickerSummaryComponent = {
    template: '#plan-picker-summary-template',
    props: {
        name: { type: String, required: true },
        price: { type: [Number, String], required: true },
        desc: { type: String, required: true }
    },
    computed: {
        formatedPrice() {
            //console.log(this.price, 'price')
            return this.price != null ? this.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 0.00
        }
    }
}

let PlanPickerItemComponent = {
    template: '#plan-picker-item-template',
    props: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        selected: { type: Boolean, default: false }
    },
    methods: {
        doSelect() {
            // name of the event. we can emit any event we want.
            // we can see the events under the Vue DevTools Timeline tab
            // first argument is the name of the event
            // second argument is the payload or data we want to send (this is optional)
            this.$emit('select', this.id)
        }   
    },
}

let PlanPickerComponent = {
    template: '#plan-picker-template',
    components: {
        'plan-picker-item': PlanPickerItemComponent,
        'plan-picker-summary': PlanPickerSummaryComponent 
    },
    methods: {
        selectPlan(plan) {
            // get selected plan
            this.selectedPlan = plan
            
            // look up plan details from plans array
            const selectedPlan = this.plans.find(x => x.id == plan)
            //console.log(selectedPlan, 'selectedPlan')
            this.selectedName = selectedPlan.name
            this.selectedPrice = selectedPlan.price
            this.selectedDesc = selectedPlan.desc
        }
    },
    data() {
        return {
            plans: [
                { id:1, name:'The Newbie', price: 10.99, desc:'I would like to start with something approachable and easy to love.' },
                { id:2, name:'The Curious', price: 12.99, desc:'I buy premium coffee from the grocery store and I know a little about roast levels' },
                { id:3, name:'The Addict', price: 14.99, desc:'I buy coffee from specialty roasters and I know the difference between blends and single origins.' }
            ],
            selectedPlan: null,
            selectedName: null,
            selectedPrice: null,
            selectedDesc: null
        }
    }
}

Vue.createApp({
    components: { 
        'plan-picker': PlanPickerComponent
    }
})
.mount('#app')