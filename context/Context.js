import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from '@/database/schema'
import { eq } from "drizzle-orm";
const { createContext, useState } = require("react");

const Context = createContext()

export const ContextProvider = ({ children }) => {

    const database = useSQLiteContext()
    const db = drizzle( database, { schema: schema })

    const [ salesPersons, setSalesPersons ] = useState([])
    const [ currentSalesPerson, setCurrentSalesPerson ] = useState({})

    const getSalesPersons = async _ => {
      try {
        const res = await db.query.salesPersons.findMany()
        setSalesPersons(res)
      } catch (error) {
        console.log(error)
      }
    }

    const [ clients, setClients ] = useState([])
    const [ currentClient, setCurrentClient ] = useState({})

    const getClients = async _ => {
      try {
        const res = await db.query.clients.findMany()
        setClients(res)
      } catch (error) {
        console.log(error)
      }
    }

    const [ sales, setSales ] = useState([])
    const [ currentSale, setCurrentSale ] = useState({})

    const getSales = async _ => {
      try {
        const res = await db.query.sales.findMany({
          with: {
            client: true,
            salesPerson: true
          }
        })
        setSales(res)
      } catch (error) {
        console.log(error)
      }
    }

    
    const createAdmin = async () => {
      const admins = await db.select().from(schema.users).where(
        eq(schema.users.userType, 'admin')
      )
      if( admins.length == 0 ){
        const admin = await db.insert(schema.users).values({
          userName: 'admin',
          userEmail: 'admin@gmail.com',
          userPassword: 'admin',
          userType: 'admin'
        })
      }
    }

    return(
        <Context.Provider value = {{
            // db
            db,

            // salespersons
            getSalesPersons,
            salesPersons,
            currentSalesPerson,
            setCurrentSalesPerson,

            // cleints
            getClients,
            clients,
            currentClient,
            setCurrentClient,

            // sales
            getSales,
            sales,
            currentSale,
            setCurrentSale,

            // create
            createAdmin
        }}>
            { children }
        </Context.Provider>
    )
}

export default Context