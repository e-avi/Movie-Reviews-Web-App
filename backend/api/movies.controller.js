import MoviesDAO from "../dao/moviesDAO.js";

export default class MoviesController{
    static async apiGetMovies(req,res,next){
        const moviesPerPage = req.query.moviesPerPage?parseInt(req.query.moviesPerPage) :20
        const page = req.query.page?parseInt(req.query.page) :0

        let filters= {}
        if(req.query.rated){
            filters.rated = req.query.rated
        }
        else if(req.query.title){
            filters.title = req.query.title
        }

        const { moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters,page,moviesPerPage})

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        res.json(response)
    }

    static async apiGetMoviesById(req,res,next){
        try{
            let id = req.params.id || {}
            let movie = await MoviesDAO.getMoviesById(id)
            if(!movie){
                res.status(404).json({ error:"Not Found"})
            }
            res.json(movie)
        }
        catch(err){
            console.log(`api,${err}`)
            res.status(500).json({ error:"not found"})
        }
    }

    static async apiGetRatings(req,res,next){
        try{
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        }
        catch(err){
            console.log(`api,${err}`)
            res.status(500).json({error:err})
        }
    }
}