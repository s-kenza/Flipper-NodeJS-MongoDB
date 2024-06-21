import {Hono} from "hono";
import { Brand } from "../models/brands";

const api = new Hono().basePath('/flippers')

api.get('/', async (c) => {
    const brands = await Brand.find();

    return c.json(brands)
})

api.get('/:id', async (c) => {
    const _id = c.req.param('id');
    const brand = await Brand.findOne({_id});

    return c.json(brand)
})

api.post('/', async (c) => {
    const body = await c.req.json()

    try {
        const brand = await Brand.create(body)
        const saveBrand = await brand.save()
        return c.json(saveBrand, 201)
    } catch (e: any) {
        return c.json(e._message, 400)
    }

})

api.put('/:brandId',async (c)=>{
    const _id  = c.req.param('brandId')
    const body = await c.req.json()

    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }

    const tryToUpdate = await Brand.findOneAndUpdate(q,updateQuery,{new:true})
    return c.json(tryToUpdate,200)

})

api.delete('/:id', async (c) => {
    const {id} = c.req.param()

    try {
        await Brand.findByIdAndDelete({_id: id})

        return c.body(null, 204)
    } catch (e: any) {
        return c.json(e._message, 400)
    }
})

export default api