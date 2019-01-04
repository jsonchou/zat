class ZAT {
    constructor(options) {
        this.$options = options
        this.$proxyTable = {
            ...this,
            ...this.$options.methods,
            ...this.$options.data,
        }
        this.init(() => {
            this.doMethods()
            this.doMounted()
            this.doComputed()
            this.doWatch()
        })
    }
    init(events) {
        let el = 'body'
        if (this.$options.el) {
            el = document.querySelector(this.$options.el)
        }
        Object.assign(this.$proxyTable, {
            '$el': el
        })
        events && events()
    }
    doMethods() {
        let methods = Object.keys(this.$options.methods)
        methods.forEach((item) => {
            this.$options.methods[item].call(this.$proxyTable)
        })
    }
    doMounted() {
        this.$options.mounted.call(this.$proxyTable)
    }
    doComputed() {
        let computed = Object.keys(this.$options.computed)
        computed.forEach((item) => {
            //do some computed code
            this.$options.computed[item].call(this.$proxyTable)
        })
    }
    doWatch() {
        let watchs = Object.keys(this.$options.watch)
        watchs.forEach((item) => {
            //do some watch code
            this.$options.watch[item].call(this.$proxyTable)
        })
    }

}

let app = new ZAT({
    el: '#app',
    data: {
        cfg: {
            width: 300,
            height: 300,
            folder_name: 'acccurate-temp'
        },
        list: []
    },
    computed: {
        listExt() {
            console.log('computed listExt', this)
        },
        cfgExt() {
            console.log('computed cfgExt', this)
        },
    },
    watch: {
        list(newVal, oldVal) {
            console.log('watch list', this)
        },
        cfg(newVal, oldVal) {
            console.log('watch cfg', this)
        },
    },
    methods: {
        funcA() {
            console.log('funcA', this)
        },
        funcB() {
            console.log('funcB', this)
        },
    },
    mounted() {
        console.log('mounted', this)
    }
})