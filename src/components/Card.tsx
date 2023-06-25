export const Card = ({name, url, id, onClick}: {name: string, url: string, id: number, onClick: (n: number) => void}) => {
    return (
        <div onClick={() => onClick(id)} className={"select-none card image-full bg-base-100 shadow-2xl border border-base-100 hover:shadow-accent hover:border-accent"}>
            <figure className={"justify-normal"}><img className={"object-cover"} draggable={"false"} src={url} alt={name}/></figure>
            <div className={"card-body"}>
                <h2 className={"card-title"}>{name}</h2>
            </div>
        </div>
    );
};
