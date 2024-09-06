import AddEmployee from '@/Components/Employees/AddEmployee'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon, SquarePlusIcon } from 'lucide-react'
import React from 'react'
import { Button, Table } from 'rsuite'

export default function Index({ auth }) {
    const { Column, HeaderCell, Cell } = Table;
    const data = [{ "id": 1, "name": "Isidro Feil-Wuckert", "firstName": "Isidro", "lastName": "Feil-Wuckert", "avatar": "https://i.pravatar.cc/150?u=Isidro", "city": "Port Wayne", "street": "Highfield Road", "postcode": "68348-7604", "email": "Ezekiel95@hotmail.com", "phone": "424.223.5265 x983", "gender": "male", "age": 36, "stars": 3113, "followers": 5490, "rating": 4, "progress": 39, "amount": "80321.79", "company": "Zieme - Stamm", "birthdate": "1952-02-23T17:47:55.514Z" }, { "id": 2, "name": "Taya Fay", "firstName": "Taya", "lastName": "Fay", "avatar": "https://i.pravatar.cc/150?u=Taya", "city": "Fabiolaside", "street": "Hawthorn Avenue", "postcode": "02060-9922", "email": "Willard13@hotmail.com", "phone": "216-647-0009", "gender": "male", "age": 32, "stars": 5689, "followers": 129, "rating": 2, "progress": 39, "amount": "35128.66", "company": "Feest, Turner and Brekke", "birthdate": "1959-10-13T06:41:59.410Z" }, { "id": 3, "name": "Jaiden Moen", "firstName": "Jaiden", "lastName": "Moen", "avatar": "https://i.pravatar.cc/150?u=Jaiden", "city": "North Darbyfurt", "street": "Price River", "postcode": "65191-4299", "email": "Manuel35@hotmail.com", "phone": "1-700-602-7063 x95526", "gender": "female", "age": 38, "stars": 307, "followers": 8165, "rating": 4, "progress": 59, "amount": "49283.11", "company": "Gerlach Group", "birthdate": "1967-07-07T20:06:08.700Z" }, { "id": 4, "name": "Garland Ward", "firstName": "Garland", "lastName": "Ward", "avatar": "https://i.pravatar.cc/150?u=Garland", "city": "New Edmondton", "street": "Quigley Knolls", "postcode": "92028-5790", "email": "Abbie_Wolf@hotmail.com", "phone": "(243) 630-9951 x4650", "gender": "female", "age": 46, "stars": 2609, "followers": 1224, "rating": 4, "progress": 6, "amount": "41614.38", "company": "Tremblay - Hartmann", "birthdate": "1951-02-04T21:19:39.020Z" }, { "id": 5, "name": "Nellie Vandervort", "firstName": "Nellie", "lastName": "Vandervort", "avatar": "https://i.pravatar.cc/150?u=Nellie", "city": "San Rafael", "street": "Ferne Rest", "postcode": "92955-8384", "email": "Alexa.Bernier91@hotmail.com", "phone": "651-379-7596", "gender": "female", "age": 18, "stars": 9003, "followers": 3497, "rating": 2, "progress": 34, "amount": "30984.24", "company": "Wolf, Tremblay and Kuphal", "birthdate": "1959-01-04T07:12:53.396Z" }, { "id": 6, "name": "Jamel Reynolds", "firstName": "Jamel", "lastName": "Reynolds", "avatar": "https://i.pravatar.cc/150?u=Jamel", "city": "Altenwerthworth", "street": "Huel Fork", "postcode": "35333-0105", "email": "Frederique_Hermann@gmail.com", "phone": "1-677-913-5509", "gender": "female", "age": 47, "stars": 2448, "followers": 9526, "rating": 3, "progress": 82, "amount": "74610.46", "company": "Schumm and Sons", "birthdate": "1971-06-22T04:25:44.349Z" }, { "id": 7, "name": "Dr. Leslie Huel-Thompson MD", "firstName": "Leslie", "lastName": "Huel-Thompson", "avatar": "https://i.pravatar.cc/150?u=Leslie", "city": "South Alvina", "street": "E 6th Avenue", "postcode": "23431", "email": "Myrtice12@hotmail.com", "phone": "1-610-822-5576 x191", "gender": "female", "age": 46, "stars": 1310, "followers": 5948, "rating": 4, "progress": 22, "amount": "53883.09", "company": "Moore - Little", "birthdate": "2002-04-26T09:34:06.069Z" }, { "id": 8, "name": "Travis Heathcote", "firstName": "Travis", "lastName": "Heathcote", "avatar": "https://i.pravatar.cc/150?u=Travis", "city": "Livonia", "street": "Spencer Bypass", "postcode": "45241", "email": "Kaya47@yahoo.com", "phone": "687-339-3733 x6110", "gender": "female", "age": 25, "stars": 4734, "followers": 6252, "rating": 2, "progress": 66, "amount": "13350.79", "company": "Bednar, Smitham and Langosh", "birthdate": "1989-05-06T07:45:34.420Z" }, { "id": 9, "name": "Moses Steuber", "firstName": "Moses", "lastName": "Steuber", "avatar": "https://i.pravatar.cc/150?u=Moses", "city": "Maricopa", "street": "Broad Lane", "postcode": "83850-6462", "email": "Hertha.Corwin63@gmail.com", "phone": "904.750.1819 x5849", "gender": "female", "age": 30, "stars": 4054, "followers": 8438, "rating": 3, "progress": 64, "amount": "9428.17", "company": "Lesch Group", "birthdate": "1972-03-09T08:22:34.430Z" }, { "id": 10, "name": "Brody Littel", "firstName": "Brody", "lastName": "Littel", "avatar": "https://i.pravatar.cc/150?u=Brody", "city": "North Jevon", "street": "Peter Expressway", "postcode": "79388", "email": "Jarred.Hahn40@hotmail.com", "phone": "(304) 280-5789 x4043", "gender": "male", "age": 29, "stars": 4292, "followers": 806, "rating": 3, "progress": 89, "amount": "88967.66", "company": "Thompson, Waters and Jacobi", "birthdate": "1957-09-22T06:04:06.485Z" }, { "id": 11, "name": "Dusty Wolf", "firstName": "Dusty", "lastName": "Wolf", "avatar": "https://i.pravatar.cc/150?u=Dusty", "city": "Hickletown", "street": "Daphne Shoal", "postcode": "12960-8563", "email": "Demario_Kunze87@hotmail.com", "phone": "665-507-9827 x317", "gender": "male", "age": 22, "stars": 7803, "followers": 9223, "rating": 2, "progress": 7, "amount": "52456.09", "company": "Quigley - Spinka", "birthdate": "1996-09-23T20:33:22.092Z" }, { "id": 12, "name": "Kadin Cremin", "firstName": "Kadin", "lastName": "Cremin", "avatar": "https://i.pravatar.cc/150?u=Kadin", "city": "Tonyworth", "street": "Cliff Road", "postcode": "56968", "email": "Dakota_Nitzsche@yahoo.com", "phone": "641-579-7276 x1763", "gender": "female", "age": 19, "stars": 6227, "followers": 1835, "rating": 3, "progress": 16, "amount": "86631.71", "company": "Larkin and Sons", "birthdate": "1982-07-16T05:54:00.021Z" }, { "id": 13, "name": "Cecil Kutch", "firstName": "Cecil", "lastName": "Kutch", "avatar": "https://i.pravatar.cc/150?u=Cecil", "city": "South Jacinto", "street": "Bria Cliff", "postcode": "23269", "email": "Antonette33@gmail.com", "phone": "1-680-323-0661", "gender": "male", "age": 30, "stars": 3382, "followers": 3757, "rating": 4, "progress": 42, "amount": "87084.86", "company": "Hackett - Howell", "birthdate": "1984-08-24T17:51:59.715Z" }, { "id": 14, "name": "Aiden Schmeler", "firstName": "Aiden", "lastName": "Schmeler", "avatar": "https://i.pravatar.cc/150?u=Aiden", "city": "East Elliotland", "street": "Frami Gateway", "postcode": "17319", "email": "Kelsie_Schimmel78@gmail.com", "phone": "314-679-9926 x84505", "gender": "male", "age": 39, "stars": 8202, "followers": 2056, "rating": 2, "progress": 89, "amount": "62622.83", "company": "McDermott, Pollich and Herzog", "birthdate": "1967-07-30T05:43:36.341Z" }, { "id": 15, "name": "Jaden Bradtke", "firstName": "Jaden", "lastName": "Bradtke", "avatar": "https://i.pravatar.cc/150?u=Jaden", "city": "Fort Mireya", "street": "Fabiola Mission", "postcode": "79113-7907", "email": "Barbara.Kerluke@hotmail.com", "phone": "260.719.9105 x59287", "gender": "male", "age": 27, "stars": 2581, "followers": 2294, "rating": 3, "progress": 96, "amount": "65774.88", "company": "Gutkowski - Roob", "birthdate": "2004-06-22T04:10:31.592Z" }, { "id": 16, "name": "Shanie Zulauf", "firstName": "Shanie", "lastName": "Zulauf", "avatar": "https://i.pravatar.cc/150?u=Shanie", "city": "Hawthorne", "street": "The Coppice", "postcode": "06796-6943", "email": "Adolf_Walsh26@hotmail.com", "phone": "(735) 373-1059 x32842", "gender": "male", "age": 25, "stars": 1778, "followers": 5943, "rating": 3, "progress": 75, "amount": "13612.83", "company": "Ziemann - Durgan", "birthdate": "1993-01-15T19:35:11.755Z" }, { "id": 17, "name": "Arlie Wunsch", "firstName": "Arlie", "lastName": "Wunsch", "avatar": "https://i.pravatar.cc/150?u=Arlie", "city": "San Leandro", "street": "E Washington Avenue", "postcode": "02342", "email": "Melody.Spinka@hotmail.com", "phone": "(982) 230-5631 x41259", "gender": "male", "age": 34, "stars": 8701, "followers": 8440, "rating": 4, "progress": 44, "amount": "30784.18", "company": "Schmitt, Wilderman and Strosin", "birthdate": "1967-01-02T12:32:36.107Z" }, { "id": 18, "name": "Deonte Dietrich", "firstName": "Deonte", "lastName": "Dietrich", "avatar": "https://i.pravatar.cc/150?u=Deonte", "city": "East Lunaport", "street": "School Lane", "postcode": "36954-3229", "email": "Helmer.Gislason7@hotmail.com", "phone": "738-623-1246 x641", "gender": "male", "age": 20, "stars": 1418, "followers": 5064, "rating": 2, "progress": 39, "amount": "72743.41", "company": "Nikolaus - Schowalter", "birthdate": "1996-06-26T02:20:18.934Z" }, { "id": 19, "name": "Dameon Rohan", "firstName": "Dameon", "lastName": "Rohan", "avatar": "https://i.pravatar.cc/150?u=Dameon", "city": "North Jessport", "street": "College Street", "postcode": "94256", "email": "Alice_Cummings@gmail.com", "phone": "218-592-4459 x005", "gender": "male", "age": 28, "stars": 5690, "followers": 4191, "rating": 3, "progress": 76, "amount": "43374.06", "company": "Huels, Greenholt and Auer", "birthdate": "1997-03-21T05:35:45.491Z" }, { "id": 20, "name": "Stefan Windler", "firstName": "Stefan", "lastName": "Windler", "avatar": "https://i.pravatar.cc/150?u=Stefan", "city": "Torrance", "street": "Streich Highway", "postcode": "42131", "email": "Jennie48@gmail.com", "phone": "762-268-5146 x3312", "gender": "female", "age": 41, "stars": 2436, "followers": 7202, "rating": 3, "progress": 54, "amount": "82228.34", "company": "Harvey - Berge", "birthdate": "1957-09-26T19:46:49.595Z" }]
    return (
        <Authenticated user={auth.user}>
            <Head title='Employees' />
            <div className="page-content employees-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Employees</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Employees</span></li>
                        </ul>
                    </div>
                    <div className="">
                        <AddEmployee />
                    </div>
                </div>
                <div className="content-wrapper">
                    <Table
                        cellBordered
                        autoHeight={true}
                        data={data}
                        onRowClick={rowData => {
                            console.log(rowData);
                        }}
                    >
                        <Column width={60} align="center" fixed>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>

                        <Column width={150}>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="firstName" />
                        </Column>

                        <Column width={150}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="lastName" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Gender</HeaderCell>
                            <Cell dataKey="gender" />
                        </Column>

                        <Column width={100}>
                            <HeaderCell>Age</HeaderCell>
                            <Cell dataKey="age" />
                        </Column>

                        <Column width={150}>
                            <HeaderCell>Postcode</HeaderCell>
                            <Cell dataKey="postcode" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                        <Column width={80} fixed="right">
                            <HeaderCell>...</HeaderCell>
                            <Cell style={{ padding: '6px' }}>
                                {rowData => (
                                    <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                                        Edit
                                    </Button>
                                )}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </Authenticated>
    )
}
