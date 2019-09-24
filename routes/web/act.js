const express = require('express');
const router = express.Router();

const User = require('../../models/User')
const Plage = require('../../models/Plage')
const Buoy = require('../../models/Buoy')


router.get('/',async (req,res)=>{
    try {
        const regions = {Tunis:0,Ariana:0,"Ben Arous":0,Manouba:0,Nabeul:0,Bizerte:0,Béja:0,Jendouba:0,Sousse:0,Monastir:0,Mahdia:0,Sfax:0,Gabès:0,Mednine:0,Tataouine:0}
        const actis = await Plage.find().select('region buoys').populate('buoys','detecs')
        
        let result = {}
        actis.forEach(a=>{
            const r = a.buoys.map(b=>b.detecs.length).reduce((sum,num)=>sum + num)
            if(!(a.region in result)){
                
                result[a.region]=[r]

            }else{
                result[a.region].unshift(r)
            }
        })

        Object.keys(result).forEach(k => {
            result[k]=result[k].reduce((sum,num)=>sum + num)
        });
        
        const final = {...regions,...result }
        result=[]
        Object.keys(final).forEach(k => {
            result.push(final[k])
        });
        res.json(result)
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message)
    }
    
})

router.get('/dash',async(req,res)=>{
    const users = await User.countDocuments({role:'USER'})
    const plages = await Plage.countDocuments()
    const buoys = await Buoy.countDocuments({status:'ON_LIGNE'})
    res.json({users,plages,buoys})
})

router.get('/:region',async(req,res)=>{
    
})



const groupBy= (list, keyGetter) =>{
    const map = new Map();
    const arr= []
    list.forEach((item) => {
        console.log(1)
         const key = 'region'
         const collection = map.get(key);
         if (!arr[item.region]) {
            console.log(2)
            arr[item.region]=[item] 
            //map.set(key, [item]);
         } else {
            console.log(3)
             arr[item.region].unshift(item)
         }
    });
    /*
    map.forEach((v,k)=>{
        arr[k]=v
    })*/
    //console.log(arr)
    return arr;
}

module.exports= router;