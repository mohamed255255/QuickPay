package Main.controller.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import Main.Service.UserService;
import Main.model.User;
import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "http://localhost:5500")
public class AuthenticationController {
     private final UserService userService;

      public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        return userService.signup(user);
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user, HttpSession session) {
        return userService.login(user, session);
    }
}
