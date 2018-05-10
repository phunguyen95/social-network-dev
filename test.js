const animals = [
    {
        "name": "cat",
        "size": "small",
        "weight": 5
    },
    {
        "name": "dog",
        "size": "small",
        "weight": 10
    },
    {
        "name": "lion",
        "size": "medium",
        "weight": 150
    },
    {
        "name": "elephant",
        "size": "big",
        "weight": 5000
    }
]

const orderItems = [
	{
		id: 1,
		title: 'item 1',
		unit_price: 2,
		quantity: 3
	}, {
		id: 2,
		title: 'item 1',
		unit_price: 3,
		quantity: 2
	}, {
		id: 3,
		title: 'item 1',
		unit_price: 4,
		quantity: 1
	}
]
const total = orderItems.reduce((total, item) => (total + item.unit_price * item.quantity), 0); //  Số 0 cuối cùng là giá trị khởi tạo
const total2 = orderItems.reduce((total,item)=>{
    console.log(total)
    return(total+item.unit_price * item.quantity);
},0)

console.log(total2)