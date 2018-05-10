import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile,getCurrentProfile } from '../../actions/profile';
import {withRouter} from 'react-router-dom';
import {isEmpty} from '../../utils/isEmpty';
 class EditProfile extends Component {
     constructor(props){
         super(props);
         this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            gitHubUserName: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
          };
          this.onChange = this.onChange.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
        }
        componentDidMount(){
            this.props.getCurrentProfile();
        }
        componentWillReceiveProps(nextProps) {
          if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
          }
          if(nextProps.profile.profile){
          let newState=  nextProps.profile.profile;
              //Bring skills  array back to comma seperated value
          const skillsCSV=newState.skills.join(',');
          //if profile fields doesnt exists,make empty string
          newState.company = !isEmpty(newState.company) ? newState.company :'';
          newState.handle = !isEmpty(newState.handle) ? newState.handle :'';
          newState.bio = !isEmpty(newState.bio) ? newState.bio :'';
          newState.website = !isEmpty(newState.website) ? newState.website :'';
          newState.location = !isEmpty(newState.location) ? newState.location :'';
          newState.gitHubUserName = !isEmpty(newState.gitHubUserName) ? newState.gitHubUserName :'';
          newState.social = !isEmpty(newState.social) ? newState.social :{};
          newState.social.twitter = !isEmpty(newState.twitter) ? newState.twitter :'';
          newState.social.facebook = !isEmpty(newState.social.facebook) ? newState.social.facebook :'';
          newState.social.youtube = !isEmpty(newState.social.youtube) ? newState.social.youtube :'';
          newState.linkedin = !isEmpty(newState.social.linkedin) ? newState.social.linkedin :'';
          newState.social.instagram = !isEmpty(newState.social.instagram) ? newState.social.instagram :'';
          this.setState({
              displaySocialInputs:newState.displaySocialInputs,
              handle: newState.handle,
              company: newState.company,
              website: newState.website,
              location: newState.location,
              status:newState.status,
              skills:skillsCSV,
              gitHubUserName:newState.gitHubUserName,
              bio: newState.bio,
              twitter: newState.social.twitter,
              facebook: newState.social.facebook,
              linkedin: newState.social.linkedin,
              youtube: newState.social.youtube,
              instagram: newState.social.instagram,
          })
        }
        }
      
        onSubmit(e) {
          e.preventDefault();
      
          const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            gitHubUserName: this.state.gitHubUserName,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
          };
          console.log(profileData);
          this.props.createProfile(profileData, this.props.history);
        }
      
        onChange(e) {
          this.setState({ [e.target.name]: e.target.value });
        }
      
        render() {
          const { errors, displaySocialInputs } = this.state;
          
          let socialInputs;
      
          if (displaySocialInputs) {
            socialInputs = (
              <div>
                <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
                />
      
                <InputGroup
                  placeholder="Facebook Page URL"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
                />
      
                <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fab fa-linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                />
      
                <InputGroup
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.youtube}
                />
      
                <InputGroup
                  placeholder="Instagram Page URL"
                  name="instagram"
                  icon="fab fa-instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  error={errors.instagram}
                />
              </div>
            );
          }
      
          // Select options for status
          const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
          ];
      
          return (
            <div className="create-profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit Your Profile</h1>
                    <p className="lead text-center">
                      Let's get some information to make your profile stand out
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        value={this.state.handle}
                        onChange={this.onChange}
                        error={errors.handle}
                        info="A unique handle for your profile URL. Your full name, company name, nickname"
                      />
                      <SelectListGroup
                        placeholder="Status"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                        options={options}
                        error={errors.status}
                        info="Give us an idea of where you are at in your career"
                      />
                      <TextFieldGroup
                        placeholder="Company"
                        name="company"
                        value={this.state.company}
                        onChange={this.onChange}
                        error={errors.company}
                        info="Could be your own company or one you work for"
                      />
                      <TextFieldGroup
                        placeholder="Website"
                        name="website"
                        value={this.state.website}
                        onChange={this.onChange}
                        error={errors.website}
                        info="Could be your own website or a company one"
                      />
                      <TextFieldGroup
                        placeholder="Location"
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        error={errors.location}
                        info="City or city & state suggested (eg. Boston, MA)"
                      />
                      <TextFieldGroup
                        placeholder="* Skills"
                        name="skills"
                        value={this.state.skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        info='Please use comma separated values (eg.
                          HTML,CSS,JavaScript,PHP)'
                      />
                      <TextFieldGroup
                        placeholder="Github Username"
                        name="gitHubUserName"
                        value={this.state.gitHubUserName}
                        onChange={this.onChange}
                        error={errors.gitHubUserName}
                        info="If you want your latest repos and a Github link, include your username"
                      />
                      <TextAreaFieldGroup
                        placeholder="Short Bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        info="Tell us a little about yourself"
                      />
      
                      <div className="mb-3">
                        <button
                          type="button"
                          onClick={() => {
                            this.setState(prevState => ({
                              displaySocialInputs: !prevState.displaySocialInputs
                            }));
                          }}
                          className="btn btn-light"
                        >
                          Add Social Network Links
                        </button>
                        <span className="text-muted">Optional</span>
                      </div>
                      {socialInputs}
                      <input
                        type="submit"
                        value="Submit"
                        className="btn btn-info btn-block mt-4"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
      
      EditProfile.propTypes = {
        profile: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
      };
      
      const mapStateToProps = state => ({
        profile: state.profile,
        errors: state.errors
      });
      
      export default connect(mapStateToProps, { createProfile,getCurrentProfile })(
        withRouter(EditProfile)
      );