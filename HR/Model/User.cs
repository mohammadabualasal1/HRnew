namespace HR.Model
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string HashedPassword { get; set;} // "Admin@123" // #rfewe231423DSsdfv
        public bool IsAdmin { get; set; }
    }
}
