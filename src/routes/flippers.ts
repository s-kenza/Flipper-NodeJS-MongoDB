import {Hono} from "hono";
import {Flipper} from "../models/flippers";

const api = new Hono().basePath('/flippers')

api.get('/', async (c) => {
    const flippers = await Flipper.find();

    return c.json(flippers)
})

api.get('/:id', async (c) => {
    const _id = c.req.param('id');
    const flipper = await Flipper.findOne({_id});

    return c.json(flipper)
})

api.post('/', async (c) => {
    const body = await c.req.json()

    try {
        const flipper = await Flipper.create(body)
        const saveFlipper = await flipper.save()
        return c.json(saveFlipper, 201)
    } catch (e: any) {
        return c.json(e._message, 400)
    }

})

api.put('/:flipperId',async (c)=>{
    const _id  = c.req.param('flipperId')
    const body = await c.req.json()

    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }

    const tryToUpdate = await Flipper.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:id', async (c) => {
    const {id} = c.req.param()

    try {
        await Flipper.findByIdAndDelete({_id: id})

        return c.body(null, 204)
    } catch (e: any) {
        return c.json(e._message, 400)
    }
})

export default api